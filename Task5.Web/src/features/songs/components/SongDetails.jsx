export default function SongDetails({ item }) {
  return (
    <div className="details">
      <img
        className="details__cover"
        src={item?.details?.coverUrl}
        alt="cover"
        onError={(e) => {
          e.currentTarget.src =
            "data:image/svg+xml;charset=utf-8," +
            encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
              <rect width="100%" height="100%" fill="#eee"/>
              <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#666" font-size="14">
                No cover
              </text>
            </svg>`);
        }}
      />

      <div className="details__content">
        <div className="details__title">
          {item.title} — {item.artist}
        </div>

        {item?.details?.previewUrl ? (
          <audio
            controls
            src={item.details.previewUrl}
            className="details__audio"
          />
        ) : (
          <div className="muted">No preview</div>
        )}

        <p className="details__review">
          {item?.details?.review ?? "No review"}
        </p>
      </div>
    </div>
  );
}
