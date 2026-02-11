export default function Spinner({ label = "Loading…" }) {
  return (
    <div className="spinner">
      <div className="spinner__dot" />
      <div className="muted">{label}</div>
    </div>
  );
}
