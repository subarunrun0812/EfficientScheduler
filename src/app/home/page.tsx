import { Metadata } from 'next'
import { HomeTemplate } from '@/components/home/CalendarTemplate'

export const metadata: Metadata = {
  title: 'ホーム',
}

export default function CalendarPage() {
  return <HomeTemplate />
}
