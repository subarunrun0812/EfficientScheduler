'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { SelectSchedule } from './SelectSchedule'
import {
  Box,
  Button,
  Flex,
  Heading,
  useBreakpointValue,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { registerEvent } from '@/components/candidate/actions/registerEvent'
import { EventDataQueryParams } from '@/components/form/FormTemplate'
import qs from 'qs'
import dayjs, { Dayjs } from 'dayjs'
import { createTimeSlotCandidates } from '@/components/candidate/actions/createTimeSlotCandidates'
import { TimeSlot } from '@/backend/domain/model/event/timeSlot'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export interface CandidateSchedule {
  id: string
  startTime: Dayjs
  endTime: Dayjs
}

export const CandidateSchedulesTemplate = () => {
  const [selectedScheduleIds, setSelectedScheduleIds] = useState<string[]>([])
  const [candidates, setCandidates] = useState<CandidateSchedule[]>([])
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const isSmallScreen = useBreakpointValue(
    { base: true, md: false },
    { ssr: true },
  )

  const searchParams = useSearchParams().toString()
  const eventData: EventDataQueryParams = qs.parse(
    searchParams,
  ) as EventDataQueryParams

  useEffect(() => {
    createTimeSlotCandidates(eventData).then(tss => {
      setTimeSlots(tss)
      setCandidates(
        tss.map(item => {
          return {
            id: item.id,
            startTime: item.startDateTime,
            endTime: item.endDateTime,
          }
        }),
      )
    })
  }, [])

  const toast = useToast()
  const router = useRouter()

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const scheduleId = event.target.value
    const isChecked = event.target.checked

    setSelectedScheduleIds(prevSelectedScheduleIds => {
      if (isChecked) {
        return [...prevSelectedScheduleIds, scheduleId]
      } else {
        return prevSelectedScheduleIds.filter(id => id !== scheduleId)
      }
    })
  }

  const handleTemporaryReservation = async () => {
    await registerEvent(
      eventData.title,
      timeSlots.filter(ts => selectedScheduleIds.includes(ts.id)),
      eventData.locationName,
    )

    toast({
      title: '仮押さえしました',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'bottom-left',
    })
    router.push('/home')
  }

  return (
    <Flex justify='flex-start' direction='column' align='center' h='90vh'>
      <Box my={10}>
        <Heading
          as='h1'
          size='xl'
          color='gray.700'
          textAlign='center'
          fontFamily='TsunagiGothic'
        >
          候補日程一覧
        </Heading>
      </Box>
      <VStack
        spacing={4}
        padding={4}
        align='start'
        w={isSmallScreen ? '100%' : '50%'}
        h='60vh'
        overflow='auto'
      >
        {candidates.map(schedule => (
          <SelectSchedule
            key={schedule.id}
            {...schedule}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </VStack>
      <Box w={isSmallScreen ? '100%' : '50%'} mt={10} p={2} alignItems='center'>
        <Button
          colorScheme='cyan'
          variant='outline'
          size='lg'
          w='100%'
          onClick={handleTemporaryReservation}
          isDisabled={selectedScheduleIds.length === 0}
        >
          仮押さえする
        </Button>
      </Box>
    </Flex>
  )
}