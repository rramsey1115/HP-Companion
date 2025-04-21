import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedRoutes = ["/beasts", "/books","/characters" ,"/houses", "/magic", "/ingredients", "/spells", "/potions", "/favorites"]; // customize

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isProtected = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/api/auth/signin', req.url)); // or redirect to your custom login
  }

  return NextResponse.next();
}

// Apply middleware to all routes, or use a matcher for specific paths
export const config = {
    matcher: ["/((?!api|_next|static|favicon.ico).*)"], // exclude public/internal paths
  };
  
