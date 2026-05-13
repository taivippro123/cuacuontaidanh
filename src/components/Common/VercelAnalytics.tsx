"use client";

import { Analytics } from "@vercel/analytics/next";

/**
 * Chỉ gắn Analytics khi deploy Vercel (có NEXT_PUBLIC_VERCEL_ENV).
 * Tránh request 404 tới `/_vercel/insights/script.js` khi chạy `next dev` local.
 */
export default function VercelAnalytics() {
  if (!process.env.NEXT_PUBLIC_VERCEL_ENV) {
    return null;
  }
  return <Analytics />;
}
