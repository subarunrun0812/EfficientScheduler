import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from '@/utils/supabase/server'

export async function middleware(request: NextRequest) {
  const res = await updateSession(request)

  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || data.user === null) {
    // 未ログインの場合, ログインページにリダイレクト
    // ただし, 認証を邪魔をしないようにする
    if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/auth/callback') {
      // do nothing
    } else {
      return NextResponse.redirect(request.nextUrl.origin)
    }
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}