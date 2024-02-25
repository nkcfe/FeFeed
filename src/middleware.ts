import { NextRequest, NextResponse } from 'next/server';
import { createClient } from './libs/supabase/middleware';

export async function middleware(req: NextRequest) {
  const { supabase, response } = createClient(req);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user?.role !== 'authenticated')
    return NextResponse.redirect(new URL('/admin', req.url));
  return response;
}

export const config = {
  matcher: '/write',
};
