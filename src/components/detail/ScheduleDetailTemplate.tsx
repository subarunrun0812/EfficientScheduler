'use client'
import {
  Button,
  VStack,
  Box,
  Text,
  Heading,
  Flex,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react'
import { Schedule } from '../type/type'
import { CandidateSchedule } from '../candidate/CandidateSchedulesTemplate'
import { SelectSchedule } from '../candidate/SelectSchedule'
import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

interface ScheduleDetailProps {
  schedule: Schedule
  candidateSchedules: CandidateSchedule[]
}

// 日付をパースして年月日を表示する関数
export function formatDate(dateString: number) {
  const year = dateString.toString().substring(0, 4)
  const month = dateString.toString().substring(4, 6)
  const day = dateString.toString().substring(6, 8)
  return `${year}年${month}月${day}日`
}

function ScheduleItem({ label, value }: { label: string; value: string }) {
  return (
    <Box marginY={4}>
      <Text fontWeight='bold' fontSize='xl'>
        {label}
      </Text>
      <Text fontSize='xl'>{value}</Text>
    </Box>
  )
}

export const ScheduleDetailTemplate = ({
  schedule,
  candidateSchedules,
}: ScheduleDetailProps) => {
  // 選択した要素取得する一連の流れ
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [selectedRadioValue, setSelectedRadioValue] = useState<string>('')

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const isChecked = event.target.checked

    if (isChecked) {
      setSelectedRadioValue(value)
      setSelectedValues([value])
    } else {
      setSelectedRadioValue('')
      setSelectedValues([])
    }
  }

  const breakpoint = useBreakpointValue(
    { base: 'base', md: false },
    { ssr: true },
  )

  const router = useRouter()
  const handleButtonClick = () => {
    // 予定フォームに遷移
    router.push('/home')
  }

  const toast = useToast()

  return (
    <Box mt={10} mb={4}>
      <Flex
        direction='column'
        align='center'
        justify='center'
        textAlign='center'
        color='gray.700'
        mt={10}
      >
        <Heading
          as='h1'
          size='xl'
          color='gray.700'
          fontFamily={'TsunagiGothic'}
        >
          予定調整確定ページ
        </Heading>
        <VStack mt={10} spacing={8} w={breakpoint ? '100%' : '40%'} p={2}>
          <ScheduleItem label='タイトル' value={schedule.title} />
          <ScheduleItem label='説明' value={schedule.description} />
          <ScheduleItem label='作成日時' value={formatDate(schedule.date)} />
          <VStack maxH='60vh' overflow='auto' w='100%'>
            {candidateSchedules.map((schedule) => (
              <SelectSchedule
                key={schedule.id}
                id={schedule.id}
                title={schedule.title}
                date={schedule.date}
                startTime={schedule.startTime}
                endTime={schedule.endTime}
                handleCheckboxChange={handleCheckboxChange}
                selectedRadioValue={selectedRadioValue}
              />
            ))}
          </VStack>
        </VStack>
        <Box w={breakpoint ? '100%' : '40%'} p={2}>
          <Button
            mt={10}
            colorScheme='cyan' // 配色
            variant='outline' // ボタンのスタイル。枠線のみ
            size='lg' // ボタンのサイズ
            w='100%' // 幅をいっぱいに
            onClick={() => {
              handleButtonClick()
              toast({
                title: '予定を確定しました',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'bottom-left',
              })
            }}
            isDisabled={selectedValues.length !== 1}
          >
            決定
          </Button>
        </Box>
        <Box w={breakpoint ? '100%' : '40%'} p={2}>
          <Button
            mt={5}
            colorScheme='red' // 配色
            size='lg' // ボタンのサイズ
            w='100%' // 幅をいっぱいに
            onClick={() => {
              if (confirm('この仮予定を削除しますか？')) {
                // TODO:削除処理
                router.push('/home')
                toast({
                  title: '削除しました',
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                  position: 'bottom-left',
                })
              }
            }}
          >
            削除
          </Button>
        </Box>
      </Flex>
    </Box>
  )
}
