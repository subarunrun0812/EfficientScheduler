'use client'

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  VStack,
  Heading,
  Box,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useBreakpointValue,
  Text,
  useToast,
} from '@chakra-ui/react'
import { PlaceModal } from './PlaceModal'
import { PlaceInfo } from './PlaceInfo'
import { useRouter } from 'next/navigation'

interface FormTemplatePresenterProps {
  title: string
  startTime: string
  endTime: string
  duration: string
  isTimeRangeError: boolean
  handleTitleChange: (value: string) => void
  handleStartTimeChange: (value: string) => void
  handleEndTimeChange: (value: string) => void
  handleDurationChange: (value: string) => void
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  startPlace: string
  endPlace: string
  setStartPlace: (value: string) => void
  setEndPlace: (value: string) => void
  transportation: string
  setTransportation: (value: string) => void
  requiredTime: string
  setRequiredTime: (value: string) => void
}

export const FormTemplatePresenter = ({
  title,
  startTime,
  endTime,
  duration,
  isTimeRangeError,
  handleTitleChange,
  handleStartTimeChange,
  handleEndTimeChange,
  handleDurationChange,
  isOpen,
  onOpen,
  onClose,
  startPlace,
  endPlace,
  setStartPlace,
  setEndPlace,
  transportation,
  setTransportation,
  requiredTime,
  setRequiredTime,
}: FormTemplatePresenterProps) => {
  const breakpoint = useBreakpointValue(
    {
      base: 'base',
      md: false,
    },
    { ssr: true },
  )
  const router = useRouter()
  const toast = useToast()
  const handleRouter = () => {
    router.push(`/candidate`)
  }

  const isDisabled =
    title === '' ||
    startTime === '' ||
    endTime === '' ||
    duration === '' ||
    isTimeRangeError ||
    parseInt(requiredTime) < 0
  return (
    <Box minHeight='100vh' mt={10}>
      <Flex direction='column' align='center' justify='center' mt={10}>
        <Box mb={4}>
          <Heading as='h1' size='xl' color='gray.700' fontFamily={'TsunagiGothic'}>
            予定作成フォーム
          </Heading>
        </Box>
        <VStack
          w='50%'
          gap={6}
          borderWidth='1px'
          borderRadius='lg'
          p={4}
          borderColor='gray.300'
          mt={10}
        >
          <FormControl isInvalid={title === ''} p={2}>
            <FormLabel color='gray.700'>タイトル</FormLabel>
            <Input
              type='text'
              value={title}
              onChange={(e) => {
                handleTitleChange(e.target.value)
              }}
              borderColor='gray.200'
            />
            {title ? null : <FormErrorMessage>必須</FormErrorMessage>}
          </FormControl>
          <Flex
            justify={breakpoint ? 'center' : 'space-between'}
            flexDirection={breakpoint ? 'column' : undefined}
            w='100%'
          >
            <FormControl isInvalid={isTimeRangeError} p={2}>
              <FormLabel color='gray.700'>調整開始時間</FormLabel>
              <Input
                placeholder='start time'
                size='lg'
                type='time'
                name='start'
                borderColor='gray.200'
                onChange={(e) => {
                  handleStartTimeChange(e.target.value)
                }}
              />
            </FormControl>
            <FormControl isInvalid={isTimeRangeError} p={2}>
              <FormLabel color='gray.700'>調整終了時間</FormLabel>
              <Input
                placeholder='end time'
                size='lg'
                type='time'
                name='end'
                borderColor='gray.200'
                onChange={(e) => {
                  handleEndTimeChange(e.target.value)
                }}
              />
            </FormControl>
            <FormControl isInvalid={duration === ''} p={2}>
              <FormLabel color='gray.700'>所要時間（分）</FormLabel>
              <NumberInput
                defaultValue={15}
                step={15}
                min={0}
                size='lg'
                clampValueOnBlur={false}
                value={duration}
                borderColor='gray.200'
                onChange={(value) => {
                  handleDurationChange(value)
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Flex>

          <PlaceInfo
            startPlace={startPlace}
            endPlace={endPlace}
            transportation={transportation}
            requiredTime={requiredTime}
            setRequiredTime={setRequiredTime}
            breakpoint={breakpoint}
          />

          <Box w='100%'>
            <Button onClick={onOpen} w='100%'>
              場所情報を編集
            </Button>
            <PlaceModal
              isOpen={isOpen}
              onClose={onClose}
              startPlace={startPlace}
              setStartPlace={setStartPlace}
              endPlace={endPlace}
              setEndPlace={setEndPlace}
              transportation={transportation}
              setTransportation={setTransportation}
              requiredTime={requiredTime}
              setRequiredTime={setRequiredTime}
            />
          </Box>
          <Box w='100%' mt={5}>
            <Button
              colorScheme='cyan'
              variant='outline'
              size='lg'
              w='100%'
              isDisabled={isDisabled}
              onClick={() => {
                // TODO : submitした時の処理
                alert(
                  title +
                    ' ' +
                    startTime +
                    ' ' +
                    endTime +
                    ' ' +
                    duration +
                    ' ' +
                    startPlace +
                    ' ' +
                    endPlace +
                    ' ' +
                    transportation +
                    ' ' +
                    requiredTime,
                )
                handleRouter()
                toast({
                  title: '予定を作成しました',
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                  position: 'bottom-left',
                })
              }}
            >
              作成
            </Button>
          </Box>
        </VStack>
      </Flex>
    </Box>
  )
}
