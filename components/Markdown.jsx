"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import bash from "highlight.js/lib/languages/bash";
import "highlight.js/styles/github.css";

const extendedSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    "iframe",
    "style", // ⬅️ Enable if you trust content (optional)
    "span",
    "div",
    "section",
    "article",
    "header",
    "footer",
  ],
  attributes: {
    ...defaultSchema.attributes,
    "*": [...(defaultSchema.attributes["*"] || []), "style"], // ✅ Allow style on all tags
    iframe: [
      ["src"],
      ["width"],
      ["height"],
      ["allow"],
      ["allowfullscreen"],
      ["frameborder"],
      ["loading"],
    ],
    style: [["type"]], // ⬅️ Optional, needed for <style type="text/css">
  },
  clobberPrefix: "", // optional: avoid __proto__ issues
};

const Markdown = ({ content }) => {
  return (
    <div className="prose prose-lg max-w-none text-wrap overflow-x-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          [rehypeSanitize, extendedSchema],
          [
            rehypeHighlight,
            {
              languages: {
                js: javascript,
                javascript,
                python,
                bash,
              },
              ignoreMissing: true,
            },
          ],
        ]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
