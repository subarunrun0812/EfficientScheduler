import { Metadata } from 'next'
import { HomeTemplate } from '@/components/home/HomeTemplate'

export const metadata: Metadata = {
  title: 'ホーム',
}

export default function CalendarPage() {
  return <HomeTemplate />
}


