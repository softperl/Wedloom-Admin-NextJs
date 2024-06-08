'use client'

import * as React from 'react'
import { getCookie } from 'cookies-next'
import useAuth from '@/lib/hooks/useAuth'
import { useEffect } from 'react'

export function AuthProviders({ children, ...props }: any) {
  const accessToken = getCookie('accessToken')
  const { setAccessToken, setIsAuthenticating, user } = useAuth()

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken)
    } else {
      setIsAuthenticating(false)
    }
  }, [accessToken])

  return <>{children}</>
}
