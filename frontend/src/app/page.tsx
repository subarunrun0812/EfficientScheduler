import { Container, Flex, Heading } from "@chakra-ui/react";
import { Box, Button } from "@yamada-ui/react";


export default function Home() {
  return (
    <Container>
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Heading>Calendar App</Heading>
      </Flex>
    </Container>
  );
}
