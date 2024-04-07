import { Box, Checkbox, Heading, VStack } from '@chakra-ui/react'
import { ChangeEvent } from 'react'

interface SelectScheduleProps {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const SelectSchedule = ({
  id,
  title,
  date,
  startTime,
  endTime,
  handleCheckboxChange,
}: SelectScheduleProps) => {
  return (
    <Box
      padding={4}
      borderWidth={1}
      borderRadius={8}
      borderColor='gray.300'
      width='100%'
    >
      <Checkbox
        size='lg'
        variant='outline'
        borderColor='gray.300'
        onChange={handleCheckboxChange}
        width='100%'
        value={id}
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
