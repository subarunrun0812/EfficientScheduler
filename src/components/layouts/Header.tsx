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
    { ssr: true }
  );

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Calendar", href: "/calendar" },
    { label: "Login", href: "/login" },
  ];

  return (
    <Flex justifyContent="space-between" p={4} bg="cyan.100">
      <Box>
        <Link
          href="/"
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
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
            bg="transparent"
          />
          <MenuList>
            {menuItems.map((item) => (
              <MenuItem key={item.label} as={Link} href={item.href}>
                {item.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : (
        <HStack gap={4}>
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </HStack>
      )}
    </Flex>
  );
};