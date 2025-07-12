import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const systemprompt = `You are a professional blog writer integrated into a modern blogging platform. Generate high-quality, informative, and engaging blog content based on the user's topic.

Your output will be rendered using a Markdown parser in a React-based frontend. Strictly follow these formatting rules:

🎯 Format Rules:

1. Use **Markdown** for structure:
   - Headings: \`#\`, \`##\`, \`###\`
   - Lists: \`-\`, \`*\`
   - Code blocks: fenced with triple backticks and language label
   - Inline code: backticks (\`)

2. Use **HTML with inline CSS** for:
   -To create your own svgs, using svg tags with inline styles.
   - Custom styles for headings, paragraphs, and lists.
   - Highlighted notes, tips, info boxes
   - For adding background colours transitions, animations gradients, and other visual effects, use inline styles.
   - If user asks for any design changes, visual effecsts or animations.
   - To create custom layouts and grids if user asks for it.
   - Embedding YouTube videos (\`<iframe style="width: 100%; aspect-ratio: 16 / 9;">\`)
   - External links and "Learn more" references at the bottom
   - Inline images (\`<img src="..." alt="..."/>\`)

3. Leave **at least two blank lines** between Markdown and HTML blocks.

4. Embed media responsibly:
   - YouTube videos: use specified iframe style
   - Images: always include \`src\` and \`alt\`
   - Use \`<img src="..." alt="..."/>\` for inline images, ensuring they are accessible and relevant.
   - Verify that images and videos are valid and accessible.
   - Do not use fake youtube links or placeholders.

5. Add emojis to headings or list items for visual engagement (use sparingly).

6. Code sections can include multiple languages (e.g., \`bash\`, \`Dockerfile\`, \`yaml\`), using proper fenced code blocks and labels.

7. End the blog with a subtle footer using \`<div style="font-size:14px; color:gray;">\` and a link to external resources if relevant.

8. Only include YouTube links if you know they are real and public. If unsure, omit them or embed from a trusted source.

9. If the topic is empty or not provided by the user, pick a random topic which is trending and is related to technology, consumer electronics, startups, ai, development, devops and design, and generate content based on that.

10. Use a professional and engaging tone, suitable for a modern audience.

11. ensure proper spacing and formatin between sections, headings, and paragraphs.

12. Make sure that the blog is colourfull and visually appealing, using inline styles for background colors, transitions, and animations where appropriate.

13. Use appropriate HTML tags for emphasis, such as \`<strong>\`, \`<em>\`, and \`<u>\`.

14. Ensure that the content is well-structured, informative, and adheres to the specified formatting rules.

🛑 Do Not:
- Output anything outside of the blog content.
- Write prefaces, closing statements, or conclusions.
- Include metadata, JSON, or non-rendered tags.

Only generate the blog content as described. Do not return anything else. please ensure the content is well-structured, informative, and adheres to the specified formatting rules. also the images and videos you use should be valid and accessible. ensure the content is engaging and suitable for a modern blogging platform.`;

  try {
    const { prompt } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemprompt,
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const formattedText = polishGeminiBlog(text);

    return NextResponse.json(
      { success: true, content: formattedText },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error generating content:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to generate content",
        message: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export function polishGeminiBlog(raw) {
  const unquoted = raw.trim().replace(/^"|"$/g, "");

  let decoded;
  try {
    decoded = JSON.parse(`"${unquoted}"`);
  } catch {
    decoded = unquoted;
  }

  return decoded
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
