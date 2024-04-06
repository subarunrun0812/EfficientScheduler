"use client";

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export const Header = () => {
  const breakpoint = useBreakpointValue(
    { base: "base", md: false },
    { ssr: false }
  );
  return (
    <Flex justifyContent="space-between" p={4}>
      <Box>
        <Link
          href="/"
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
          color="teal.500"
          fontSize="2xl"
        >
          Calendar
        </Link>
      </Box>
      <Spacer />
      {breakpoint ? (
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
          />
          <MenuList>
            <MenuItem as={Link} href="/">
              Home
            </MenuItem>
            <MenuItem as={Link} href="/calendar">
              Calendar
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <HStack gap={4}>
          <Link href="/">Home</Link>
          <Link href="/calendar">Calendar</Link>
        </HStack>
      )}
    </Flex>
  );
};
