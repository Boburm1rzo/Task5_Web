export default function SongCard({ item }) {
  return (
    <div className="songCard">
      <img
        className="songCard__cover"
        src={item?.details?.coverUrl}
        alt="cover"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.src =
            "data:image/svg+xml;charset=utf-8," +
            encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240">
              <rect width="100%" height="100%" fill="#eee"/>
              <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#666" font-size="14">
                No cover
              </text>
            </svg>`);
        }}
      />

      <div className="songCard__title">{item.title}</div>
      <div className="songCard__meta muted">{item.artist}</div>
      <div className="songCard__meta muted">
        {item.album} • {item.genre}
      </div>

      <div className="songCard__likes">❤️ {item.likes}</div>

      {item?.details?.previewUrl ? (
        <audio
          controls
          className="songCard__audio"
          src={item.details.previewUrl}
        />
      ) : (
        <div className="muted">No preview</div>
      )}
    </div>
  );
}
