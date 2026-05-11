/** Human-readable relative time for feed timestamps. */
export function formatRelativeTime(iso: string): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  let sec = Math.max(0, Math.floor((Date.now() - t) / 1000));
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  if (sec < 45) return "just now";
  if (min < 60)
    return `about ${min} minute${min === 1 ? "" : "s"} ago`;
  if (hr < 24) return `about ${hr} hour${hr === 1 ? "" : "s"} ago`;
  if (day < 7) return `about ${day} day${day === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString();
}
