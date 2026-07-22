import { afterEach, describe, expect, it, vi } from "vitest";
import handler from "./contact";

function makeRequest(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request("https://example.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

describe("api/contact handler", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.RESEND_APITOKEN;
  });

  it("rejects non-POST methods", async () => {
    const res = await handler(new Request("https://example.com/api/contact", { method: "GET" }));
    expect(res.status).toBe(405);
  });

  it("rejects invalid input, e.g. an empty name or a malformed email", async () => {
    const res = await handler(
      makeRequest({ name: "", email: "not-an-email", message: "" }, { "x-forwarded-for": "1.1.1.1" }),
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.code).toBe("invalid_input");
  });

  it("silently accepts honeypot-filled submissions without calling Resend", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const res = await handler(
      makeRequest(
        { name: "Bot", email: "bot@example.com", message: "spam", website: "http://spam.example" },
        { "x-forwarded-for": "2.2.2.2" },
      ),
    );

    expect(res.status).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("enforces the per-IP rate limit after 5 requests within the window", async () => {
    const ip = "3.3.3.3";
    for (let i = 0; i < 5; i += 1) {
      const res = await handler(makeRequest({ name: "", email: "", message: "" }, { "x-forwarded-for": ip }));
      expect(res.status).toBe(400);
    }

    const res = await handler(makeRequest({ name: "", email: "", message: "" }, { "x-forwarded-for": ip }));
    expect(res.status).toBe(429);
  });

  it("strips HTML tags and normalizes the email before forwarding to Resend", async () => {
    process.env.RESEND_APITOKEN = "test-token";
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify({ id: "abc" }), { status: 200 }));

    const res = await handler(
      makeRequest(
        { name: "<b>Lucas</b>", email: "  LUCAS@Example.com  ", message: "Olá!" },
        { "x-forwarded-for": "4.4.4.4" },
      ),
    );

    expect(res.status).toBe(200);
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    const [, init] = fetchSpy.mock.calls[0];
    const payload = JSON.parse((init as RequestInit).body as string);
    expect(payload.reply_to).toBe("lucas@example.com");
    expect(payload.text).not.toContain("<b>");
    expect(payload.text).not.toContain("</b>");
  });
});
