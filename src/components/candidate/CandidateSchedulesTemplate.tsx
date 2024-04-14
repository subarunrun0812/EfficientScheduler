'use client'

import { ChangeEvent, useState } from 'react'
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
import { useRouter } from 'next/navigation'
import { registerEvent } from '@/components/candidate/actions/registerEvent'

export interface CandidateSchedule {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
}

interface CandidateListProps {
  candidateSchedules: CandidateSchedule[]
}

export const CandidateSchedulesTemplate = ({
  candidateSchedules,
}: CandidateListProps) => {
  const [selectedScheduleIds, setSelectedScheduleIds] = useState<string[]>([])
  const isSmallScreen = useBreakpointValue(
    { base: true, md: false },
    { ssr: true },
  )
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
    await registerEvent({
      id: '1',
      title: '仮押さえ',
      date: '2022-01-01',
      startTime: '09:00',
      endTime: '10:00',
    })
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
        {candidateSchedules.map(schedule => (
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
