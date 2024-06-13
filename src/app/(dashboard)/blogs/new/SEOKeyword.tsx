import Tagify from '@yaireo/tagify'
import '@yaireo/tagify/dist/tagify.css'
import { useEffect, useRef } from 'react'

const SEOKeyword = ({ setValue, ...field }: any) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (inputRef.current) {
      const tagify = new Tagify(inputRef.current)

      tagify.on('change', e => {
        let tagObjects = []

        try {
          tagObjects = JSON.parse(e.detail.value)
        } catch (error) {
          console.error('Error parsing Tagify value:', error)
        }

        if (Array.isArray(tagObjects)) {
          const seokeywords = tagObjects.map((tag: { value: string }) => tag.value)
          console.log('seokeywords:', seokeywords)
          setValue('seokeywords', seokeywords)
        }
      })
    }
  }, [setValue])

  return (
    <div className='relative flex flex-col group'>
      <label htmlFor='input' className='text-sm mb-1 dark:text-white/80 group-focus-within:text-primary'>
        {field.label}
      </label>
      <input
        ref={inputRef}
        {...field}
        id='input'
        className='rounded-md dark:border-gray-700 hover:border-gray-400 focus:border-primary focus:hover:border-primary focus-within:border-primary focus-within:hover:border-primary focus-visible:border-primary focus-visible:hover:border-primary'
      />
    </div>
  )
}

export default SEOKeyword
