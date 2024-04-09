import { Box, Checkbox, Heading, VStack } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'

interface SelectScheduleProps {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void
  selectedRadioValue?: string
}

export const SelectSchedule = ({
  id,
  title,
  date,
  startTime,
  endTime,
  handleCheckboxChange,
  selectedRadioValue,
}: SelectScheduleProps) => {
  const [isCheck, setIsCheck] = useState(false)
  const isChecked =
    selectedRadioValue !== undefined ? selectedRadioValue === id : isCheck
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
        onChange={(e) => {
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
        <VStack align='start' w='100%'>
          <Box>
            <Heading size='lg'>{title}</Heading>
          </Box>
          <Box>
            <Heading size='md' color='gray.600'>
              {date}&nbsp;{startTime}~{endTime}
            </Heading>
          </Box>
        </VStack>
      </Checkbox>
    </Box>
  )
}
