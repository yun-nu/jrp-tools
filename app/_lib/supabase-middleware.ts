import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  let response;

  switch (true) {
    case user &&
      (pathname.startsWith("/login") || pathname.startsWith("/signup")):
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/";
      response = NextResponse.redirect(loginUrl);
      break;

    case !user && pathname.startsWith("/account/"):
      const accountUrl = request.nextUrl.clone();
      accountUrl.pathname = "/";
      response = NextResponse.redirect(accountUrl);
      break;

    case pathname === "/account":
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/account/characters";
      response = NextResponse.redirect(redirectUrl);
      break;

    default:
      response = NextResponse.next({ request });
      break;
  }

  const supabaseCookies = supabaseResponse.cookies.getAll();

  for (const cookie of supabaseCookies) {
    const { name, value, ...cookieOptions } = cookie;
    response.cookies.set(name, value, cookieOptions);
  }

  return response;
}
