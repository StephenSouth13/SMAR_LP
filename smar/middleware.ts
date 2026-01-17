import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Tạm thời cho phép mọi người vào để check xem lỗi Module còn không
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
     // Sau khi cài được @supabase/ssr, chúng ta sẽ quay lại code logic check session sau
     console.log("Middleware đang chạy trên path:", request.nextUrl.pathname);
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}