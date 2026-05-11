import axios from "axios";

/**
 * در dev، baseURL خالی می‌ماند تا درخواست‌ها به همان origin (Vite) زده شود و
 * از طریق proxy به بک‌اند برود — این با withCredentials معمولاً مشکل CORS را برطرف می‌کند.
 * در build، مگر VITE_API_BASE_URL ست شده باشد، همان URL مستند استفاده می‌شود.
 */
const baseURL =
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.DEV ? "" : "https://qbc11-front-next.liara.run/");

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
