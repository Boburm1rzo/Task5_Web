export type SongDto = {
  index: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  likes: number;
  coverUrl: string;
  previewUrl: string;
  detailsUrl: string;
};

export type SongsPageResponse = {
  page: number;
  pageSize: number;
  songs: SongDto[];
};

export type SongDetailsDto = {
  index: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  likes: number;
  coverUrl: string;
  previewUrl: string;
  lyricsUrl: string;
  review: string;
  durationSeconds: number;
  releaseYear: string;
};

export type LyricsDto = {
  lines: { timeSeconds: number; text: string }[];
};

export type ViewMode = "table" | "gallery";
