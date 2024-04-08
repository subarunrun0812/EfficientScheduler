import { Container, Flex, HStack, Heading } from '@chakra-ui/react'
import { TopTemplate } from '../components/top/TopTemplate'
import { Metadata } from 'next'
import { LoginTemplate } from '@/components/top/LoginTemplate'

export const metadata: Metadata = {
  title: 'Home',
}

export default function HomePage() {
  return (
    <HStack>
      <LoginTemplate />;
      <TopTemplate />;
    </HStack>
  )
}
