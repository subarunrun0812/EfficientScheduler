import { Box } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box as="footer" bg="teal.500" mt={4}>
      <Box p={4} color="white">
        &copy; 2021 Calendar App
      </Box>
    </Box>
  );
};
