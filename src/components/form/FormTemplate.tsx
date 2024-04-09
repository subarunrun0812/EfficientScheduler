'use client'

import { useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { FormTemplatePresenter } from './FormTemplatePresenter'

interface FormTemplateProps {}

export const FormTemplate = ({}: FormTemplateProps) => {
  const [title, setTitle] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [duration, setDuration] = useState('15')
  const [isTimeRangeError, setIsTimeRangeError] = useState(false)
  const [startPlace, setStartPlace] = useState('')
  const [endPlace, setEndPlace] = useState('')
  const [transportation, setTransportation] = useState('')
  const [requiredTime, setRequiredTime] = useState('')

  const handleTitleChange = (value: string) => setTitle(value)
  const handleStartTimeChange = (value: string) => setStartTime(value)
  const handleEndTimeChange = (value: string) => setEndTime(value)
  const handleDurationChange = (value: string) => setDuration(value)

  useEffect(() => {
    if (startTime === '' || endTime === '') {
      setIsTimeRangeError(true)
    } else {
      const startTimeArray: string[] = startTime.split(':')
      const endTimeArray: string[] = endTime.split(':')
      const startTimeMinute =
        parseInt(startTimeArray[0]) * 60 + parseInt(startTimeArray[1])
      const endTimeMinute =
        parseInt(endTimeArray[0]) * 60 + parseInt(endTimeArray[1])
      if (startTime >= endTime) {
        setIsTimeRangeError(true)
        return
      } else if (endTimeMinute - startTimeMinute < parseInt(duration)) {
        setIsTimeRangeError(true)
        return
      } else {
        setIsTimeRangeError(false)
      }
    }
  }, [startTime, endTime, duration])

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <FormTemplatePresenter
      title={title}
      startTime={startTime}
      endTime={endTime}
      duration={duration}
      isTimeRangeError={isTimeRangeError}
      handleTitleChange={handleTitleChange}
      handleStartTimeChange={handleStartTimeChange}
      handleEndTimeChange={handleEndTimeChange}
      handleDurationChange={handleDurationChange}
      isOpen={isOpen}
      onOpen={onOpen}
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
  )
}
