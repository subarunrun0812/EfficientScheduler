import { CandidateSchedulesTemplate } from '@/components/candidate/CandidateSchedulesTemplate'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '空き日程候補一覧',
}

export default function CandidatePage() {
  return (
    <>
      <CandidateSchedulesTemplate />
    </>
  )
}
