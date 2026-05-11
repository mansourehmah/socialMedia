import { AxiosError } from "axios";

export function getAxiosErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof AxiosError) {
    const d = err.response?.data as
      | { error?: string; message?: string }
      | undefined;
    if (typeof d?.error === "string" && d.error) return d.error;
    if (typeof d?.message === "string" && d.message) return d.message;
  }
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}
