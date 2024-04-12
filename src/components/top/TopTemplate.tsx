import { Button, Center, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { LoginTemplate } from '@/components/top/LoginTemplate'

export const TopTemplate = () => {
  return (
    <HStack>
      <Box width={{ base: '100%', md: '50%' }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginTop={{ base: '20%', md: '0%' }}>
          <VStack spacing={8}>
            <Heading size='2xl'>Calendar app</Heading>
            <Text fontSize='24px' textAlign='center'>This application allows you to manage your schedule effectively.</Text>
            <LoginTemplate />
          </VStack>
        </Box>
      </Box>
      <Box display={{ base: 'none', md: 'block' }}>
        <Center h="100vh">
          <Box width="90%" display="flex" alignItems="center">
            <Image
              src="/icon1.webp"
              height="auto"
              maxHeight="80%"
              objectFit="contain"
              alt=""
            />
          </Box>
        </Center>
      </Box>
    </HStack >
  );
};