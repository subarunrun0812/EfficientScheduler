import { Metadata } from 'next'
import { HomeTemplate } from '@/components/home/HomeTemplate'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'ホーム',
}

export default function CalendarPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeTemplate />
    </Suspense>
  )
}
