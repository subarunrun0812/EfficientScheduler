import { Button, Center, Image } from '@chakra-ui/react'
import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

const GoogleIcon = () => {
  return (
    <Image
      src='https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg'
      width='20px'
      height='20px'
      alt='Google'
    />
  )
}

export const LoginTemplate = () => {
  // refs: https://supabase.com/docs/guides/auth/social-login/auth-google
  const logInWithGoogle = async () => {
    'use server'

    const supabase = createClient()

    const result = await supabase.auth.getUser()
    if (result.data.user) {
      // already signed in
      redirect('/home')
    }

    const origin = headers().get('origin')
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback?next=/home`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
          scope:
            'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar.events.owned https://www.googleapis.com/auth/calendar.events.freebusy https://www.googleapis.com/auth/calendar.readonly',
        },
      },
    })

    if (error) {
      // TODO: handle error
      console.error(error)
    } else {
      if (data.url) {
        redirect(data.url)
      }
    }
  }

  return (
    <form action={logInWithGoogle}>
      <Button leftIcon={<GoogleIcon />} type='submit'>
        Sign in with Google
      </Button>
    </form>
  )
}
