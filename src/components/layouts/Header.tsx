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
  useToast,
} from '@chakra-ui/react'
import { EditIcon, HamburgerIcon } from '@chakra-ui/icons'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarPlus,
  faHouseChimney,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'

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
          {
            label: 'ホーム',
            href: '/home',
            icon: <FontAwesomeIcon icon={faHouseChimney} />,
          },
          {
            label: '予定作成',
            href: '/form',
            icon: <FontAwesomeIcon icon={faCalendarPlus} />,
          },
          {
            label: 'ログアウト',
            href: '/logout',
            icon: <FontAwesomeIcon icon={faSignOutAlt} />,
          },
        ]
      : []

  useEffect(() => {
    getCurrentUser()
  }, [])

  const toast = useToast()

  return (
    <Flex justifyContent='space-between' p={4} bg='cyan.100'>
      <Box>
        <Link
          href='/'
          textDecoration='none'
          _hover={{ textDecoration: 'none' }}
          fontSize='2xl'
          fontFamily={'TsunagiGothic'}
        >
          かりスケ
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
                      toast({
                        title: 'ログアウトしました',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                        position: 'bottom-left',
                      })
                    }}
                    icon={item.icon}
                    fontFamily={'TsunagiGothic'}
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
                    icon={item.icon}
                    fontFamily={'TsunagiGothic'}
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
