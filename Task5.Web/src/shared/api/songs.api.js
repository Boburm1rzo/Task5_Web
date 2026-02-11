import { httpGetJson } from "./http.js";

const DEFAULT_BATCH = 22;

function normalizeResponse(data, page, pageSize) {
  if (data && !Array.isArray(data) && data.title) {
    return {
      page,
      pageSize:20,
      total: 1,
      items: [
        {
          index: data.index,
          title: data.title,
          artist: data.artist,
          album: data.album,
          genre: data.genre,
          likes: data.likes,
          details: {
            coverUrl: data.coverUrl,
            previewUrl: data.previewUrl,
            review: data.reviewText,
          },
        },
      ],
    };
  }

  return data;
}

export function buildSongsUrl({ locale, seed, likesAvg, page, pageSize, batch = DEFAULT_BATCH }) {
  const url = new URL(`/api/songs/${batch}`, window.location.origin);
  url.searchParams.set("locale", locale);
  url.searchParams.set("seed", String(seed));
  url.searchParams.set("likesAvg", String(likesAvg));
  url.searchParams.set("page", String(page));
  if (pageSize != null) url.searchParams.set("pageSize", String(pageSize));
  return url.toString();
}

export async function fetchSongs(params) {
  const url = buildSongsUrl(params);
  const data = await httpGetJson(url);
  return normalizeResponse(data, params.page, params.pageSize);
}
