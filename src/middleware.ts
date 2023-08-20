export { default } from "next-auth/middleware"
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { isAuthenticated } from "@/lib/auth"
 
// export async function middleware(req: NextRequest) {
//   const sessionExists = await isAuthenticated()
//   if ( sessionExists &&  req.nextUrl.pathname === "/") return NextResponse.redirect(new URL('/dashboard', req.url))
// }

export const config = { matcher: ["/dashboard", "/dashboard/incomes", "/dashboard/expenses"] }