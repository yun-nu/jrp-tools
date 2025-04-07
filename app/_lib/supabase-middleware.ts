import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/account"];
const AUTH_ROUTES = ["/login", "/signup"];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });
  const pathname = request.nextUrl.pathname;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // For UI purposes
  if (user) {
    supabaseResponse.cookies.set("logged-in-as", user.email ?? "", {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  switch (true) {
    // Logged in and trying to access an auth route
    case user && AUTH_ROUTES.some((route) => pathname.startsWith(route)):
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/";
      return NextResponse.redirect(loginUrl);

    // Not logged in and trying to access a protected route
    case !user && PROTECTED_ROUTES.some((route) => pathname.startsWith(route)):
      const accountUrl = request.nextUrl.clone();
      accountUrl.pathname = "/";
      return NextResponse.redirect(accountUrl);

    // Redirect away from /account to /account/characters
    case pathname === "/account":
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/account/characters";
      return NextResponse.redirect(redirectUrl);

    default:
      break;
  }

  return supabaseResponse;
}
