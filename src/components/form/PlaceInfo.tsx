import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react'

interface PlaceInfoProps {
  startPlace: string
  endPlace: string
  transportation: string
  requiredTime: string
  setRequiredTime: (value: string) => void
  breakpoint: boolean | string | undefined
}

export const PlaceInfo = ({
  startPlace,
  endPlace,
  transportation,
  requiredTime,
  setRequiredTime,
  breakpoint,
}: PlaceInfoProps) => {
  return (
    <Flex
      justify={breakpoint ? 'center' : 'space-between'}
      flexDirection={breakpoint ? 'column' : undefined}
      w='100%'
      p={4}
    >
      {startPlace ? (
        <FormControl w='100%'>
          <FormLabel color='gray.700'>出発地</FormLabel>
          <Box>
            <Text>{startPlace}</Text>
          </Box>
        </FormControl>
      ) : null}
      {endPlace ? (
        <FormControl w='100%'>
          <FormLabel color='gray.700'>目的地</FormLabel>
          <Box>
            <Text>{endPlace}</Text>
          </Box>
        </FormControl>
      ) : null}
      {transportation ? (
        <FormControl w='100%'>
          <FormLabel color='gray.700'>交通手段</FormLabel>
          <Box>
            <Text>{transportation}</Text>
          </Box>
        </FormControl>
      ) : null}
      {startPlace && endPlace && transportation ? (
        <FormControl w='100%'>
          <FormLabel>移動時間</FormLabel>
          <Input
            value={requiredTime}
            type='text'
            onChange={(e) => setRequiredTime(e.target.value)}
          />
        </FormControl>
      ) : null}
    </Flex>
  )
}
