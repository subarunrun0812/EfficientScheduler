'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, HStack, VStack, useBreakpointValue } from '@chakra-ui/react'
import { ScheduleList } from '../schedule/ScheduleList'
import { Schedule } from '../schedule/type'
import { CreateScheduleButton } from '../schedule/CreateScheduleButton'

export const HomeTemplate = () => {
  const breakpoint = useBreakpointValue(
    { base: 'base', md: false },
    { ssr: true },
  )

  const scheduleList: Schedule[] = [
    {
      id: 1,
      title: 'Meeting',
      date: 20230931,
      description: 'Meeting with the team',
    },
    {
      id: 2,
      title: 'Interview',
      date: 20230930,
      description: 'Interview with the candidate',
    },
    {
      id: 3,
      title: 'Lunch',
      date: 20230903,
      description: 'Lunch with the team',
    },
    {
      id: 4,
      title: 'Presentation',
      date: 20230904,
      description: 'Presenting to clients',
    },
    {
      id: 5,
      title: 'Training',
      date: 20230905,
      description: 'Training session for new employees',
    },
    {
      id: 6,
      title: 'Conference',
      date: 20230906,
      description: 'Attending a conference',
    },
    {
      id: 7,
      title: 'Project Deadline',
      date: 20230907,
      description: 'Finalizing project deliverables',
    },
  ]
  return breakpoint ? (
    // mobile view
    <VStack gap={4}>
      <Box padding={5} width='100%'>
        <CreateScheduleButton width='60%' height='70px' />
        <ScheduleList width='100%' schedules={scheduleList} />
      </Box>
      <Box width='100%' padding={10}>
        <FullCalendar plugins={[dayGridPlugin]} initialView='dayGridMonth' />
      </Box>
    </VStack>
  ) : (
    <Box padding={5}>
      <HStack gap={5}>
        <VStack width='30%'>
          <CreateScheduleButton width='60%' height='100px' />
          <ScheduleList width='100%' schedules={scheduleList} />
        </VStack>
        <Box width='70%'>
          <FullCalendar plugins={[dayGridPlugin]} initialView='dayGridMonth' />
        </Box>
      </HStack >
    </Box >
  )
}
