/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Auth validation disabled - will be added later
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
