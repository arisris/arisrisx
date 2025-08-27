export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export const randomId = (len: number = 5) => {
  const letter = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array(len)
    .fill(0)
    .map(() => letter[Math.floor(Math.random() * letter.length)])
    .join("");
};

export const isUrl = (text: unknown) => {
  if (typeof text !== "string") return false;
  return text.startsWith("http://") || text.startsWith("https://");
};

export const fixGoogleImage = (url?: string | null) => {
  if (!url) return url;
  if (url.match(/googleusercontent.com/)) {
    url = url.replaceAll("=s96-c", "");
    console.log(url);
  }
  return url;
};
