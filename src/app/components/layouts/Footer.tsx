import { Box } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box as="footer" mt={4}>
      <Box p={4} color="black">
        &copy; {new Date().getFullYear()} Calendar App
      </Box>
    </Box>
  );
};
