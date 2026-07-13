export const config = { runtime: "edge" };

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

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return json(405, { error: "Method Not Allowed" });
  }

  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (!checkRate(ip)) {
    return json(429, { error: "Aguarde um pouco antes de tentar novamente." });
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return json(400, { error: "Corpo inválido." });
  }

  if (body.website && body.website.trim().length > 0) {
    return json(200, { message: "Mensagem recebida." });
  }

  const name = cleanText(body.name ?? "", 120);
  const email = cleanEmail(body.email ?? "");
  const message = cleanText(body.message ?? "", 2000);

  if (!name || !email || !message || !EMAIL.test(email)) {
    return json(400, { error: "Dados inválidos." });
  }

  const apiKey = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env.RESEND_APITOKEN
    ?? (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env.RESEND_API_KEY;
  if (!apiKey) {
    return json(500, { error: "Serviço de email não configurado." });
  }

  const env = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env ?? {};
  const from = env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
  const to = env.CONTACT_TO_EMAIL || "lucasmontalvao2019@gmail.com";

  const textBody = `Nome: ${name}\n\nEmail: ${email}\n\nMensagem:\n${message}`;

  const response = await fetch("https://api.resend.com/emails", {
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

  if (!response.ok) {
    return json(502, { error: "Não foi possível enviar agora." });
  }

  return json(200, { message: "Mensagem enviada com sucesso." });
}
