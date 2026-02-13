import axios from "axios";
import type { SongDetailsDto, SongsPageResponse } from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api",
});

export async function getSongs(params: {
  locale: string;
  seed: number;
  likesAvg: number;
  page: number;
  pageSize: number;
}) {
  const res = await api.get<SongsPageResponse>("/songs", { params });
  return res.data;
}

export async function getSongDetails(params: {
  index: number;
  locale: string;
  seed: number;
  likesAvg: number;
}) {
  const { index, ...query } = params;
  const res = await api.get<SongDetailsDto>(`/songs/${index}`, {
    params: query,
  });
  return res.data;
}

export async function getLyrics(params: {
  index: number;
  locale: string;
  seed: number;
}) {
  const res = await api.get(`/songs/${params.index}/lyrics`, {
    params: { locale: params.locale, seed: params.seed },
  });
  return res.data;
}
