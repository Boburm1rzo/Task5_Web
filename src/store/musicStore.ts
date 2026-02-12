import { create } from "zustand";
import type { ViewMode } from "../types";

type MusicState = {
  locale: string;
  seed: number;
  likesAvg: number;

  view: ViewMode;

  page: number;
  pageSize: number;

  expandedIndex: number | null;

  setLocale: (v: string) => void;
  setSeed: (v: number) => void;
  randomSeed: () => void;
  setLikesAvg: (v: number) => void;

  setView: (v: ViewMode) => void;
  setPage: (p: number) => void;

  toggleExpanded: (index: number) => void;
  resetList: () => void;
};

function randSeed53() {
  const hi = Math.floor(Math.random() * 0x1fffff);
  const lo = Math.floor(Math.random() * 0xffffffff);
  return hi * 0x100000000 + lo;
}

export const useMusicStore = create<MusicState>((set, get) => ({
  locale: "en",
  seed: 58933423,
  likesAvg: 3.0,

  view: "table",

  page: 1,
  pageSize: 20,

  expandedIndex: null,

  setLocale: (v) => set({ locale: v, page: 1, expandedIndex: null }),
  setSeed: (v) => set({ seed: v, page: 1, expandedIndex: null }),
  randomSeed: () => set({ seed: randSeed53(), page: 1, expandedIndex: null }),
  setLikesAvg: (v) => set({ likesAvg: v, page: 1, expandedIndex: null }),

  setView: (v) => set({ view: v, page: 1, expandedIndex: null }),
  setPage: (p) => set({ page: p }),

  toggleExpanded: (index) =>
    set({ expandedIndex: get().expandedIndex === index ? null : index }),

  resetList: () => set({ page: 1, expandedIndex: null }),
}));
