import { Button, Center, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { LoginTemplate } from '@/components/top/LoginTemplate'

export const TopTemplate = () => {
  return (
    <HStack minH='100vh'>
      <Box width={{ base: '100%', md: '50%' }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack spacing={8}>
            <Heading as="h1" size='4xl' fontFamily={"TsunagiGothic"}>かりスケ</Heading>
            <Text fontSize="xl" textAlign='center' fontFamily={"TsunagiGothic"}>面接などの予定を自動で仮押さえ！</Text>
            <LoginTemplate />
          </VStack>
        </Box>
      </Box>
      <Box display={{ base: 'none', md: 'block' }} alignItems="center" marginTop='-3%'>
        <Image
          src="/icon1.webp"
          height="90vh"
          width="90%"
          objectFit="contain"
          alt=""
        />
      </Box>
    </HStack >
  );
};