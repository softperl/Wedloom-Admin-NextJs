'use server'

import { cookies, headers } from 'next/headers'

export async function getTokens() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value
  return { accessToken, refreshToken }
}

export async function fetchFn(url: string, options: any) {
  try {
    const { accessToken, refreshToken } = await getTokens()
    const customOptions = {
      ...options,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'x-refresh-token': `${refreshToken}`,
        'Content-Type': 'application/json'
      }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, customOptions)
    const data = await res.json()
    return data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function getRole() {
  try {
    const url = `/auth/get-role`
    const options = {
      method: 'GET'
    }
    const data = await fetchFn(url, options)
    return data?.role
  } catch (error: any) {
    throw new Error(error.message)
  }
}
