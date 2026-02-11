import { useState } from "react";
import { LOCALES, LIKES_MAX, LIKES_MIN } from "../../../shared/config/constants.js";

function clamp(n, min, max) {
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function randomSeed64() {
  // JS number 53-bit, shuning uchun seed string bo‘ladi
  const a = BigInt(Date.now());
  const b = BigInt(Math.floor(Math.random() * 1_000_000_000));
  return String((a << 20n) ^ b);
}

export default function useGenerationState() {
  const [locale, setLocale] = useState(LOCALES[0]?.value ?? "en-US");
  const [seed, setSeed] = useState(() => randomSeed64());
  const [likesAvg, setLikesAvgRaw] = useState(3.7);
  const [view, setView] = useState("table"); // "table" | "gallery"

  const setLikesAvg = (value) => setLikesAvgRaw(clamp(Number(value), LIKES_MIN, LIKES_MAX));

  return {
    locale,
    setLocale,
    seed,
    setSeed,
    likesAvg,
    setLikesAvg,
    view,
    setView,
    randomSeed64,
  };
}
