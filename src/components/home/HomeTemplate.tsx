'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Box, Flex, useBreakpointValue, VStack } from '@chakra-ui/react'
import { ScheduleList } from './ScheduleList'
import { Schedule } from '../type/type'
import { CreateScheduleButton } from './CreateScheduleButton'
import { useEffect, useState } from 'react'
import { getTentativeEvents } from '@/components/home/actions/getTentativeEvents'

export const HomeTemplate = () => {
  const [tentativeEvents, setTentativeEvents] = useState<Schedule[]>([])
  const breakpoint = useBreakpointValue(
    { base: 'base', md: false },
    { ssr: true },
  )

  useEffect(() => {
    getTentativeEvents().then(schedules => {
      console.log(schedules)
      setTentativeEvents(schedules)
    })
  }, [])

  return breakpoint ? (
    // mobile view
    <VStack gap={4}>
      <VStack padding={4} gap={4} width='100%'>
        <CreateScheduleButton width='100%' height='70px' />
        <ScheduleList width='100%' schedules={tentativeEvents} />
      </VStack>
      <Box width='100%' padding={10}>
        <FullCalendar plugins={[dayGridPlugin]} initialView='dayGridMonth' />
      </Box>
    </VStack>
  ) : (
    <Box padding={5}>
      <Flex gap={5}>
        <VStack width='30%'>
          <CreateScheduleButton width='70%' height='90px' />
          <ScheduleList width='100%' schedules={tentativeEvents} />
        </VStack>
        <Box width='70%'>
          <FullCalendar plugins={[dayGridPlugin]} initialView='dayGridMonth' />
        </Box>
      </Flex>
    </Box>
  )
}
