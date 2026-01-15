import { headers } from "next/headers";

// Build a server-safe base URL for internal API calls.
export async function getBaseUrl() {
  const headerList = await headers();
  // Prefer forwarded headers, then Vercel env, then local fallback.
  const protocol = headerList.get("x-forwarded-proto") ?? "http";
  const host =
    headerList.get("x-forwarded-host") ??
    headerList.get("host") ??
    process.env.VERCEL_URL ??
    "localhost:3000";
  const resolvedProtocol =
    process.env.VERCEL_URL && !host.includes("localhost") ? "https" : protocol;
  return `${resolvedProtocol}://${host}`;
}
