export const config = { runtime: "edge" };

declare const process: { env: Record<string, string | undefined> };

function readEnv(name: string): string | undefined {
  try {
    return process?.env?.[name];
  } catch {
    return undefined;
  }
}

export default async function handler(): Promise<Response> {
  const body = {
    status: "ok",
    resendApiKey: Boolean(readEnv("RESEND_APITOKEN") ?? readEnv("RESEND_API_KEY")),
    contactFromConfigured: Boolean(readEnv("CONTACT_FROM_EMAIL")),
    contactToConfigured: Boolean(readEnv("CONTACT_TO_EMAIL")),
    runtime: "edge",
    timestamp: new Date().toISOString(),
  };

  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
