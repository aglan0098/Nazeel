// src/utils/decodeToken.ts
export function decodeToken<T = any>(token: string): T | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    // Convert from base64url to base64
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    // Decode base64 safely as UTF-8
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload) as T;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
