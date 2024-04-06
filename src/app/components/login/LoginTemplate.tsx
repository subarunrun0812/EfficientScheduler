import {
  Button,
  Center,
  HStack,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";

export const LoginTemplate = () => {
  return (
    <Center h="100vh">
      <VStack>
        <Heading>Login</Heading>
        <HStack>
          <Button>
            <Image
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
              width="20px"
              height="20px"
              alt="Google"
            />
            &nbsp;with Google
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
};
