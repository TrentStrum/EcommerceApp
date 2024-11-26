import { Analytics } from '@vercel/analytics/react'

export function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  )
}

