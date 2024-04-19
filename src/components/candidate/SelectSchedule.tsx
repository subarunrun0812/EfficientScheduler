import { Box, Checkbox, Heading, VStack } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

interface SelectScheduleProps {
  id: string
  startTime: string
  endTime: string
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void
  selectedRadioValue?: string
}

export const SelectSchedule = ({
  id,
  startTime,
  endTime,
  handleCheckboxChange,
  selectedRadioValue,
}: SelectScheduleProps) => {
  const [isCheck, setIsCheck] = useState(false)
  const isChecked =
    selectedRadioValue !== undefined ? selectedRadioValue === id : isCheck

  function formatDateTimeRange(start: Dayjs, end: Dayjs): string {
    const year = start.year()
    const month = start.month() + 1
    const day = start.date()
    const startTime = start.format('HH:mm')
    const endTime = end.format('HH:mm')

    return `${year}年${month}月${day}日 ${startTime}~${endTime}`
  }

  return (
    <Box
      padding={4}
      borderWidth={1}
      borderRadius={8}
      borderColor='gray.300'
      width='100%'
      _hover={{ bg: 'gray.100' }}
      bg={isChecked ? 'gray.100' : 'white'}
    >
      <Checkbox
        size='lg'
        variant='outline'
        borderColor='gray.300'
        onChange={e => {
          handleCheckboxChange(e)
          if (selectedRadioValue !== undefined) {
            setIsCheck(selectedRadioValue === id)
          } else {
            setIsCheck(!isCheck)
          }
        }}
        width='100%'
        value={id}
        id={id}
        isChecked={isChecked}
        className='checkbox'
      >
        <VStack align='start' w='100%' ml={4}>
          <Box>
            <Heading size='md' color='gray.600' fontFamily={'TsunagiGothic'}>
              {formatDateTimeRange(dayjs(startTime), dayjs(endTime))}
            </Heading>
          </Box>
        </VStack>
      </Checkbox>
    </Box>
  )
}
