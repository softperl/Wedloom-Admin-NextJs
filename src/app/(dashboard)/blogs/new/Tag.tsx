import Tagify from '@yaireo/tagify'
import '@yaireo/tagify/dist/tagify.css'
import { useEffect, useRef } from 'react'

const Tag = ({ ...field }: any) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (inputRef.current) {
      const tagify = new Tagify(inputRef.current)

      tagify.on('change', e => {
        console.log('Tagify values:', e.detail.value)
      })
    }
  }, [])

  return (
    <div className='relative flex flex-col group'>
      <label htmlFor='input' className='text-sm mb-1 text-white/80 group-focus-within:text-primary'>
        {field.label}
      </label>
      <input
        ref={inputRef}
        {...field}
        id='input'
        className='rounded-md border-gray-700 hover:border-gray-400 focus:border-primary focus:hover:border-primary focus-within:border-primary focus-within:hover:border-primary focus-visible:border-primary focus-visible:hover:border-primary'
      />
    </div>
  )
}

export default Tag
