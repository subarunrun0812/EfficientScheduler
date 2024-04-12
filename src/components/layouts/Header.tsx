'use client'

import {
  Avatar,
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
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

export const Header = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const router = useRouter()

  const getCurrentUser = async () => {
    const supabase = createClient()
    const { data } = await supabase.auth.getSession()
    if (data.session) {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setCurrentUser(user)
    } else {
      setCurrentUser(null)
    }
  }

  const logout = async () => {
    if (confirm('本当にログアウトしますか？')) {
      const supabase = createClient()
      const { error } = await supabase.auth.signOut()
      if (error) {
        alert('ログアウトできませんでした')
      } else {
        window.location.reload()
      }
    }
  }

  // const breakpoint = useBreakpointValue(
  //   { base: 'base', md: false },
  //   { ssr: true },
  // )

  const menuItems =
    currentUser !== null
      ? [
          { label: 'ホーム', href: '/home' },
          { label: '予定作成', href: '/form' },
          { label: 'ログアウト', href: '/logout' },
        ]
      : []

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <Flex justifyContent='space-between' p={4} bg='cyan.100'>
      <Box>
        <Link
          href='/'
          textDecoration='none'
          _hover={{ textDecoration: 'none' }}
          fontSize='2xl'
        >
          Calendar
        </Link>
      </Box>
      <Spacer />
      {currentUser ? (
        <Menu>
          <MenuButton
            as={Avatar}
            size='sm'
            src={currentUser?.user_metadata.avatar_url}
            cursor='pointer'
          />
          <MenuList>
            {menuItems.map((item) => {
              if (item.label === 'ログアウト') {
                return (
                  <MenuItem
                    key={item.label}
                    as={Link}
                    _hover={{ textDecoration: 'none' }}
                    onClick={() => {
                      logout()
                    }}
                  >
                    {item.label}
                  </MenuItem>
                )
              } else {
                return (
                  <MenuItem
                    key={item.label}
                    as={Link}
                    href={item.href}
                    _hover={{ textDecoration: 'none' }}
                  >
                    {item.label}
                  </MenuItem>
                )
              }
            })}
          </MenuList>
        </Menu>
      ) : null}
    </Flex>
  )
}
