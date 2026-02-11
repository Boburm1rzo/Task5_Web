export default function ErrorBanner({ error }) {
  const msg =
    typeof error === "string" ? error : error?.message || "Unknown error";
  return <div className="error">{msg}</div>;
}
