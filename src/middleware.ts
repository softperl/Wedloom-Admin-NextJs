import { NextRequest, NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'

export type TUser = {
  id: string
  name: string
  email: string
  profilePhoto: string
  role: string
  session: string
}

export default async function middleware(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams.toString()
  const pathname = req.nextUrl.pathname
  const requestHeaders = new Headers(req.headers)

  let user = null
  const accessToken = req.cookies.get('accessToken')?.value

  if (accessToken) {
    try {
      const decodedUser: TUser & { exp: number } = jwtDecode(`${accessToken}`)
      user = decodedUser
    } catch (error) {
      console.log(error)
    }
  }

  const publicRoutes = ['/signin']

  if (!user) {
    if (publicRoutes.some(route => pathname.startsWith(route))) {
    } else {
      return NextResponse.redirect(new URL(`/signin?next=${pathname}`, req.url))
    }
  } else {
    if (publicRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'
  ]
}

// return NextResponse.rewrite(
//   new URL(`/application${pathname === "/" ? "/home" : pathname}`, req.url)
// );
