'use client'

import { SimpleGrid, Box, Text, Divider } from '@chakra-ui/react'
import { Schedule } from './type'
import { useRouter } from 'next/navigation'


interface ScheduleListProps {
  width?: string | number
  schedules: Schedule[]
}

interface ScheduleDetailsProps {
  id?: string | number
}

export const ScheduleList = ({ width, schedules }: ScheduleListProps) => {
  // 仮候補日程を作成した日付を降順にソートする関数
  const sortSchedulesByDate = (schedules: Schedule[]) => {
    return schedules.slice().sort((a, b) => a.date - b.date)
  }

  const sortedSchedules = sortSchedulesByDate(schedules)

  // 予定フォームに遷移する関数
  const router = useRouter();
  const handleButtonClick = ({ id }: ScheduleDetailsProps) => {
    router.push(`/detail?id=${id}`);
  };
  const renderScheduleItem = (schedule: Schedule) => {
    return (
      <Box
        key={schedule.id}
        bg='cyan.50'
        textAlign='center'
        cursor='pointer'
        _hover={{ bg: 'cyan.100' }}
        p={4}
        //リンク先のページに遷移する
        onClick={() => handleButtonClick({ id: schedule.id })}
        borderRadius='10px'
      >
        <Text fontSize='2xl'>{schedule.description}</Text>
        <Text>
          仮候補日程を作成した日 <br />
          {schedule.date}
        </Text>
      </Box>
    )
  }

  return (
    <Box
      border="2px"
      borderColor="cyan.700"
      borderStyle="solid"
      padding="10px"
      width={width}
      borderRadius="30px"
      borderWidth="3px"
    >
      <Text fontSize='3xl' textAlign='center'>
        調整中の予定一覧
      </Text>
      <Divider border='1.5px solid cyan.700' margin='10px 0' />
      <SimpleGrid
        columns={1}
        spacing={2}
        overflow='auto'
        maxH='600'
        padding='10px'
      >
        {sortedSchedules.map(renderScheduleItem)}
      </SimpleGrid>
    </Box>
  )
}
