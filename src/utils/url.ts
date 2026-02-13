const API = import.meta.env.VITE_API_BASE_URL;

export function toApiAbsoluteUrl(url: string) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  if (url.startsWith("/")) return `${API}${url}`;

  return `${API}/${url}`;
}
