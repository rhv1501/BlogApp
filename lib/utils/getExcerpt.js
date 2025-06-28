import removeMarkdown from "remove-markdown";

export const getExcerpt = (markdown, maxLength = 160) => {
  const plainText = removeMarkdown(markdown || "");
  if (plainText.length <= maxLength) return plainText;
  return plainText.slice(0, maxLength).trim() + "…";
};
