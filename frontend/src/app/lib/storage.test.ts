import { afterEach, describe, expect, it, vi } from "vitest";
import { readStorageValue, writeStorageValue } from "./storage";

const isTheme = (value: string): value is "light" | "dark" => value === "light" || value === "dark";

describe("storage", () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("returns the fallback when nothing is stored", () => {
    expect(readStorageValue("theme", "light", isTheme)).toBe("light");
  });

  it("returns the stored value when it passes validation", () => {
    localStorage.setItem("theme", "dark");
    expect(readStorageValue("theme", "light", isTheme)).toBe("dark");
  });

  it("falls back when the stored value fails validation", () => {
    localStorage.setItem("theme", "purple");
    expect(readStorageValue("theme", "light", isTheme)).toBe("light");
  });

  it("returns the fallback when localStorage.getItem throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(readStorageValue("theme", "light", isTheme)).toBe("light");
  });

  it("silently ignores write errors instead of throwing", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(() => writeStorageValue("theme", "dark")).not.toThrow();
  });

  it("persists a value that can be read back", () => {
    writeStorageValue("lang", "EN");
    expect(localStorage.getItem("lang")).toBe("EN");
  });
});
