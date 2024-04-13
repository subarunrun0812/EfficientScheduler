import { Container, Flex, HStack, Heading } from '@chakra-ui/react'
import { TopTemplate } from '../components/top/TopTemplate'
import { Metadata } from 'next'
import { LoginTemplate } from '@/components/top/LoginTemplate'
import { VStack } from '@chakra-ui/react'

export const metadata: Metadata = {
  title: 'かりスケ',
}

export default function HomePage() {
  return (
    <TopTemplate />
  )
}
