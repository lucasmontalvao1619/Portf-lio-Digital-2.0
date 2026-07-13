export const config = { runtime: "edge" };

declare const process: { env: Record<string, string | undefined> };

interface ContactBody {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
}

const HTML_TAG = /<[^>]*>/g;
const WHITESPACE = /\s+/g;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value: string, maxLength: number): string {
  const withoutTags = value.normalize("NFKC").replace(HTML_TAG, "");
  let output = "";
  for (const character of withoutTags) {
    const code = character.charCodeAt(0);
    const isControl = code < 32 || code === 127;
    const isAllowedWhitespace = character === "\n" || character === "\r" || character === "\t";
    if (!isControl || isAllowedWhitespace) {
      output += character;
    }
  }
  output = output.trim();
  return output.length <= maxLength ? output : output.slice(0, maxLength);
}

function cleanEmail(value: string): string {
  return cleanText(value, 254).replace(WHITESPACE, "").toLowerCase();
}

const rateBuckets = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 5;

function checkRate(ip: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (bucket.count >= RATE_LIMIT) return false;
  bucket.count += 1;
  return true;
}

function json(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function readEnv(name: string): string | undefined {
  try {
    return process?.env?.[name];
  } catch {
    return undefined;
  }
}

export default async function handler(request: Request): Promise<Response> {
  try {
    if (request.method !== "POST") {
      return json(405, { error: "Method Not Allowed" });
    }

    const forwarded = request.headers.get("x-forwarded-for") ?? "";
    const ip = forwarded.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
    if (!checkRate(ip)) {
      return json(429, { error: "Aguarde um pouco antes de tentar novamente.", code: "rate_limited" });
    }

    let body: ContactBody;
    try {
      body = (await request.json()) as ContactBody;
    } catch {
      return json(400, { error: "Corpo inválido.", code: "invalid_body" });
    }

    if (body.website && body.website.trim().length > 0) {
      return json(200, { message: "Mensagem recebida." });
    }

    const name = cleanText(body.name ?? "", 120);
    const email = cleanEmail(body.email ?? "");
    const message = cleanText(body.message ?? "", 2000);

    if (!name || !email || !message || !EMAIL.test(email)) {
      return json(400, { error: "Dados inválidos.", code: "invalid_input" });
    }

    const apiKey = readEnv("RESEND_APITOKEN") ?? readEnv("RESEND_API_KEY");
    if (!apiKey) {
      console.error("[contact] RESEND_APITOKEN nao definido. Configure a variavel de ambiente na Vercel.");
      return json(503, { error: "Serviço de email não configurado.", code: "not_configured" });
    }

    const from = readEnv("CONTACT_FROM_EMAIL") || "Portfolio <onboarding@resend.dev>";
    const to = readEnv("CONTACT_TO_EMAIL") || "lucasmontalvao2019@gmail.com";

    const textBody = `Nome: ${name}\n\nEmail: ${email}\n\nMensagem:\n${message}`;

    let response: Response;
    try {
      response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          subject: "Novo contato do portfólio",
          text: textBody,
          reply_to: email,
        }),
      });
    } catch (networkError) {
      console.error("[contact] Falha ao chamar Resend:", networkError);
      return json(502, { error: "Não foi possível conectar ao serviço de email.", code: "resend_unreachable" });
    }

    if (!response.ok) {
      const upstreamText = await response.text().catch(() => "");
      console.error("[contact] Resend respondeu erro", response.status, upstreamText);
      const upstreamMessage = extractResendMessage(upstreamText);
      return json(502, {
        error: "Não foi possível enviar agora.",
        code: "resend_error",
        upstream_status: response.status,
        upstream_message: upstreamMessage,
      });
    }

    return json(200, { message: "Mensagem enviada com sucesso." });
  } catch (unexpected) {
    console.error("[contact] Erro inesperado:", unexpected);
    return json(500, { error: "Erro interno.", code: "unexpected" });
  }
}

function extractResendMessage(rawBody: string): string | undefined {
  if (!rawBody) return undefined;
  try {
    const parsed = JSON.parse(rawBody) as { message?: string; name?: string };
    if (typeof parsed.message === "string") return parsed.message;
    if (typeof parsed.name === "string") return parsed.name;
  } catch {
    // ignora — corpo não era JSON
  }
  return rawBody.slice(0, 200);
}
