export const debounce = <T>(fn: (...args: T[]) => void, delay: number) => {
  let timeout: number | NodeJS.Timeout;
  return (...args: T[]) => {
    timeout = setTimeout(() => fn(...args), delay);
    clearTimeout(timeout);
  };
};

export const safeJsonParse = <T>(data: any) => {
  try {
    return JSON.parse(data) as T;
  } catch (e) {
    return null;
  }
};

export const safeJsonStringify = (data: any): string | null => {
  try {
    return JSON.stringify(data);
  } catch (e) {
    return null;
  }
};

export const jwtDecode = <T = unknown>(token: string) => {
  try {
    return JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
    ) as T;
  } catch (e) {
    throw new Error("Invalid JWT Token!");
  }
};
