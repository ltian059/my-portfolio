import { headers } from "next/headers";

// Build a server-safe base URL for internal API calls.
export async function getBaseUrl() {
  const headerList = await headers();
  // Prefer forwarded headers, then Vercel env, then local fallback.
  const forwardedProto = headerList.get("x-forwarded-proto") ?? "http";
  const host =
    headerList.get("x-forwarded-host") ??
    headerList.get("host") ??
    process.env.VERCEL_URL ??
    "localhost:3000";
  // Force https on Vercel preview/prod when a public host is present.
  const protocol =
    process.env.VERCEL_URL && !host.includes("localhost")
      ? "https"
      : forwardedProto;
  return `${protocol}://${host}`;
}

// Forward auth cookies/headers for preview environments that require protection.
export async function getApiHeaders() {
  const headerList = await headers();
  const cookie = headerList.get("cookie");
  const authorization = headerList.get("authorization");
  const forwarded: Record<string, string> = {};
  // Forward cookie/auth to pass Vercel preview protection.
  if (cookie) forwarded.cookie = cookie;
  if (authorization) forwarded.authorization = authorization;
  return forwarded;
}

// Fetch JSON from internal APIs with forwarded auth headers.
export async function fetchApiJson<T>(
  path: string,
  init?: RequestInit,
  options?: { allowNotFound?: boolean }
) {
  const baseUrl = await getBaseUrl();
  const apiHeaders = await getApiHeaders();
  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      ...apiHeaders,
      ...(init?.headers ?? {}),
    },
    // Default to no-store to avoid stale API data on server render.
    cache: init?.cache ?? "no-store",
  });

  if (!res.ok) {
    // Optionally let callers handle 404 without throwing.
    if (options?.allowNotFound && res.status === 404) {
      return null as T;
    }
    throw new Error(`Failed to load ${path} (${res.status}).`);
  }

  return (await res.json()) as T;
}
