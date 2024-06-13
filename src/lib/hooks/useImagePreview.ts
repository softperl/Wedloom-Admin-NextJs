import { useState, useRef } from 'react'

const useImagePreview = () => {
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemove = () => {
    setImageSrc(null)
    setSelectedFile(null)
    resetFileInput()
  }

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return { imageSrc, selectedFile, handleFileChange, handleRemove, fileInputRef }
}

export default useImagePreview
