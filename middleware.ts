import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
    const cookieStore = cookies()
    const isAuth = cookieStore.get('auth')

    if (!isAuth) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
    return NextResponse.next();
}
 
export const config = {
  matcher: '/dashboard/:path*',
}