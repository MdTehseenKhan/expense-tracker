export { default } from "next-auth/middleware"
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { getAuthSession } from "@/lib/auth"
 
// export async function middleware(req: NextRequest) {
//   const session = await getAuthSession()
//   if (!session?.user) return NextResponse.redirect(new URL('/', req.url))
// }

export const config = { matcher: ["/dashboard/:path*"] }