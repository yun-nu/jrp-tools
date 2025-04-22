import { type NextRequest } from "next/server";
import { updateSession } from "./app/_lib/supabase-middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/account/:path*", "/login", "/signup"],
};
