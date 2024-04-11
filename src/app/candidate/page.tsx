import {
  CandidateSchedule,
  CandidateSchedulesTemplate,
} from '@/components/candidate/CandidateSchedulesTemplate'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '空き日程候補一覧',
}

export default function CandidatePage() {
  const candidateSchedules: CandidateSchedule[] = [
    {
      id: '1',
      title: '面談',
      date: '2022-01-01',
      startTime: '10:00',
      endTime: '12:00',
    },
    {
      id: '2',
      title: '面談',
      date: '2022-01-02',
      startTime: '10:00',
      endTime: '12:00',
    },
    {
      id: '3',
      title: '面談',
      date: '2022-01-02',
      startTime: '10:00',
      endTime: '12:00',
    },
    {
      id: '4',
      title: '面談',
      date: '2022-01-02',
      startTime: '10:00',
      endTime: '12:00',
    },
    {
      id: '5',
      title: '面談',
      date: '2022-01-02',
      startTime: '10:00',
      endTime: '12:00',
    },
    {
      id: '6',
      title: '面談',
      date: '2022-01-02',
      startTime: '10:00',
      endTime: '12:00',
    },
    {
      id: '7',
      title: '面談',
      date: '2022-01-02',
      startTime: '10:00',
      endTime: '12:00',
    },
  ]

  return (
    <>
      <CandidateSchedulesTemplate candidateSchedules={candidateSchedules} />
    </>
  )
}
