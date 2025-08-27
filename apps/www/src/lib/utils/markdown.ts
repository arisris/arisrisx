import { marked } from "marked";
import { slugify } from "./string";

export type FrontMatterData = {};

type MarkdownHeading = {
  text: string;
  depth: number;
  slug: string;
};

type MarkdownContent<T extends FrontMatterData> = {
  slug: string;
  data: T;
  headings: MarkdownHeading[];
  html: string;
  raw: string;
};

export function parseJsonFrontMatter<T extends FrontMatterData>(
  markdown: string,
): { data: T; content: string } {
  const parsed = markdown.match(/^---\n([\s\S]+?)\n---/);
  const data = parsed ? JSON.parse(parsed[1]) : {};
  const content = parsed ? markdown.slice(parsed[0].length) : markdown;
  return { data, content };
}

export const parseWithFrontMatter = async <T extends FrontMatterData>(
  raw: string,
): Promise<Omit<MarkdownContent<T>, "slug">> => {
  const { data, content } = parseJsonFrontMatter<T>(raw);
  const headings: MarkdownHeading[] = [];
  marked.use({
    renderer: {
      heading(token) {
        const text = token.text,
          depth = token.depth,
          slug = slugify(text);
        headings.push({ text, depth, slug });
        return `<h${depth} id="${slug}">${text}</h${depth}>`;
      },
    },
  });
  const html = await marked.parse(content, {
    silent: true,
    gfm: true,
    async: true,
  });
  return { data, headings, html, raw: content };
};
