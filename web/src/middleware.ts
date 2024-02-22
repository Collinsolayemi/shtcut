import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { AppMiddleware, parse } from '@shtcut/_shared';

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const { domain, path, fullPath, key, fullKey } = parse(req);
    // console.log('domain::', domain);
    // return AppMiddleware(req);
}
