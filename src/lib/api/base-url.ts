import { headers } from "next/headers";

// Build a server-safe base URL for internal API calls.
export async function getBaseUrl() {
  const headerList = await headers();
  const protocol = headerList.get("x-forwarded-proto") ?? "http";
  const host =
    headerList.get("x-forwarded-host") ??
    headerList.get("host") ??
    "localhost:3000";
  return `${protocol}://${host}`;
}
