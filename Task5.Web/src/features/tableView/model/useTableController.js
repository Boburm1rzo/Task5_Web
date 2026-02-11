import { useEffect, useState } from "react";

export default function useTableController(generationKey) {
  const [page, setPage] = useState(1);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Parametrlar o‘zgarsa: 1-page + collapse reset
  useEffect(() => {
    setPage(1);
    setExpandedIndex(null);
  }, [generationKey]);

  const toggleExpanded = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return { page, setPage, expandedIndex, toggleExpanded };
}
