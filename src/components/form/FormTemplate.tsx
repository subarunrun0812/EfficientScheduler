'use client'

import { useDisclosure, useToast } from '@chakra-ui/react'
import { useEffect, useReducer } from 'react'

import { FormTemplatePresenter } from './FormTemplatePresenter'
import { useRouter } from 'next/navigation'
import { createTimeSlotCandidates } from '@/components/form/actions/createTimeSlotCandidates'

interface FormTemplateProps {}

export interface FormState {
  title: string
  startTime: string
  endTime: string
  duration: string
  isTimeRangeError: boolean
  startPlace: string
  endPlace: string
  transportation: string
  requiredTime: string
}

type FormAction =
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_START_TIME'; payload: string }
  | { type: 'SET_END_TIME'; payload: string }
  | { type: 'SET_DURATION'; payload: string }
  | { type: 'SET_TIME_RANGE_ERROR'; payload: boolean }
  | { type: 'SET_START_PLACE'; payload: string }
  | { type: 'SET_END_PLACE'; payload: string }
  | { type: 'SET_TRANSPORTATION'; payload: string }
  | { type: 'SET_REQUIRED_TIME'; payload: string }

const initialState: FormState = {
  title: '',
  startTime: '',
  endTime: '',
  duration: '15',
  isTimeRangeError: false,
  startPlace: '',
  endPlace: '',
  transportation: '',
  requiredTime: '',
}

const reducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload }
    case 'SET_START_TIME':
      return { ...state, startTime: action.payload }
    case 'SET_END_TIME':
      return { ...state, endTime: action.payload }
    case 'SET_DURATION':
      return { ...state, duration: action.payload }
    case 'SET_TIME_RANGE_ERROR':
      return { ...state, isTimeRangeError: action.payload }
    case 'SET_START_PLACE':
      return { ...state, startPlace: action.payload }
    case 'SET_END_PLACE':
      return { ...state, endPlace: action.payload }
    case 'SET_TRANSPORTATION':
      return { ...state, transportation: action.payload }
    case 'SET_REQUIRED_TIME':
      return { ...state, requiredTime: action.payload }
    default:
      return state
  }
}

const validateTimeRange = (
  startTime: string,
  endTime: string,
  duration: string,
): boolean => {
  if (startTime === '' || endTime === '') {
    return true
  }
  const startTimeArray: string[] = startTime.split(':')
  const endTimeArray: string[] = endTime.split(':')
  const startTimeMinute =
    parseInt(startTimeArray[0]) * 60 + parseInt(startTimeArray[1])
  const endTimeMinute =
    parseInt(endTimeArray[0]) * 60 + parseInt(endTimeArray[1])
  if (startTime >= endTime) {
    return true
  } else if (endTimeMinute - startTimeMinute < parseInt(duration)) {
    return true
  }
  return false
}

export const FormTemplate = ({}: FormTemplateProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const isError = validateTimeRange(
      state.startTime,
      state.endTime,
      state.duration,
    )
    dispatch({ type: 'SET_TIME_RANGE_ERROR', payload: isError })
  }, [state.startTime, state.endTime, state.duration])

  const router = useRouter()
  const toast = useToast()
  const handleRouter = () => {
    router.push(`/candidate`)
  }

  const handleSubmit = async () => {
    const candidates = await createTimeSlotCandidates(state)
    handleRouter()
    toast({
      title: '予定を作成しました',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'bottom-left',
    })
  }

  return (
    <FormTemplatePresenter
      {...state}
      handleTitleChange={value =>
        dispatch({ type: 'SET_TITLE', payload: value })
      }
      handleStartTimeChange={value =>
        dispatch({ type: 'SET_START_TIME', payload: value })
      }
      handleEndTimeChange={value =>
        dispatch({ type: 'SET_END_TIME', payload: value })
      }
      handleDurationChange={value =>
        dispatch({ type: 'SET_DURATION', payload: value })
      }
      setStartPlace={value =>
        dispatch({ type: 'SET_START_PLACE', payload: value })
      }
      setEndPlace={value => dispatch({ type: 'SET_END_PLACE', payload: value })}
      setTransportation={value =>
        dispatch({ type: 'SET_TRANSPORTATION', payload: value })
      }
      setRequiredTime={value =>
        dispatch({ type: 'SET_REQUIRED_TIME', payload: value })
      }
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}
