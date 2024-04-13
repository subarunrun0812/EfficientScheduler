'use client'

import { ChangeEvent, useState } from 'react'
import { SelectSchedule } from './SelectSchedule'
import {
  Box,
  Button,
  Flex,
  Heading,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'

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
  // 選択した要素取得する一連の流れ
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const isChecked = event.target.checked

    if (isChecked) {
      setSelectedValues([...selectedValues, value])
    } else {
      setSelectedValues(selectedValues.filter((item) => item !== value))
    }
  }

  const breakpoint = useBreakpointValue(
    { base: 'base', md: false },
    { ssr: true },
  )

  // URLパラメータ取得
  // const searchParams = useSearchParams()
  // const test = searchParams.get('id')

  return (
    <Flex justify='flex-start' direction='column' align='center' h='90vh'>
      <Box my={10}>
        <Heading as='h1' size='xl' color='gray.700' textAlign='center' fontFamily={"TsunagiGothic"}>
          候補日程一覧
        </Heading>
      </Box>
      <VStack
        spacing={4}
        padding={4}
        align='start'
        w={breakpoint ? '100%' : '50%'}
        h='60vh'
        overflow='auto'
      >
        {candidateSchedules.map((schedule) => (
          <SelectSchedule
            key={schedule.id}
            id={schedule.id}
            title={schedule.title}
            date={schedule.date}
            startTime={schedule.startTime}
            endTime={schedule.endTime}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </VStack>
      <Box w={breakpoint ? '100%' : '50%'} mt={10} p={2} alignItems='center'>
        <Button
          colorScheme='cyan'
          variant='outline'
          size='lg'
          w='100%'
          onClick={() => {
            // TODO : 仮押さえ実行処理
            alert(selectedValues)
          }}
          isDisabled={selectedValues.length === 0}
        >
          仮押さえする
        </Button>
      </Box>
    </Flex>
  )
}
