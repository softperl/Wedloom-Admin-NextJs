import React from 'react'

import FormValidationBasic from './FormValidationBasic'
import { fetchFn } from '@/lib/servet-utils'

export default async function page() {
  let data = null

  try {
    data = await fetchFn(`/blog/category/get-all`, {
      method: 'GET',
      next: {
        revalidate: 0,
        tags: ['categories']
      }
    })
  } catch (error) {
    console.log(error)
  }
  return <FormValidationBasic categories={data.categories} />
}
