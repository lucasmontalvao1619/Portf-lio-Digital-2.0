import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { T } from "../../data/content";
import { ContactForm } from "./ContactForm";

function fillValidForm() {
  fireEvent.change(screen.getByLabelText(T.PT.contact.form.name), { target: { value: "Lucas" } });
  fireEvent.change(screen.getByLabelText(T.PT.contact.form.email), { target: { value: "lucas@example.com" } });
  fireEvent.change(screen.getByLabelText(T.PT.contact.form.message), { target: { value: "Olá!" } });
}

describe("ContactForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("blocks submission and shows an error when required fields are empty", async () => {
    render(<ContactForm tr={T.PT} />);

    fireEvent.click(screen.getByRole("button", { name: T.PT.contact.form.send }));

    expect(await screen.findByText("Preencha todos os campos.")).toBeInTheDocument();
  });

  it("sends the form and shows the success state on a successful response", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(JSON.stringify({ message: "ok" }), { status: 200 }));

    render(<ContactForm tr={T.PT} />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: T.PT.contact.form.send }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(T.PT.contact.form.sent)).toBeInTheDocument();
  });

  it("shows a translated error message when the server responds with a known error code", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: "Dados inválidos.", code: "invalid_input" }), { status: 400 }),
    );

    render(<ContactForm tr={T.PT} />);
    fillValidForm();
    fireEvent.click(screen.getByRole("button", { name: T.PT.contact.form.send }));

    expect(await screen.findByText("Verifique os campos e tente novamente.")).toBeInTheDocument();
  });
});
