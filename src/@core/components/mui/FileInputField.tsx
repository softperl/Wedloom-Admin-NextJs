'use client'

// React Imports

// MUI Imports
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

// Third-party Imports

// Icon Imports
import { useDropzone } from 'react-dropzone'

import CustomTextField from './TextField'

const CustomFileUploader = ({ setValue, ...field }: any) => {
  const onDrop = (acceptedFiles: any) => {
    setValue('files', acceptedFiles, { shouldValidate: true })
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  // const renderFilePreview = (file: FileProp) => {
  //   if (file.type.startsWith('image')) {
  //     return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
  //   } else {
  //     return <i className='tabler-file-description' />
  //   }
  // }

  // const handleRemoveFile = (file: FileProp) => {
  //   const uploadedFiles = files
  //   const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)

  //   setFiles([...filtered])
  // }

  // const fileList = files.map((file: FileProp) => (
  //   <ListItem key={file.name}>
  //     <div className='file-details'>
  //       <div className='file-preview'>{renderFilePreview(file)}</div>
  //       <div>
  //         <Typography className='file-name'>{file.name}</Typography>
  //         <Typography className='file-size' variant='body2'>
  //           {Math.round(file.size / 100) / 10 > 1000
  //             ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
  //             : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
  //         </Typography>
  //       </div>
  //     </div>
  //     <IconButton onClick={() => handleRemoveFile(file)}>
  //       <i className='tabler-x text-xl' />
  //     </IconButton>
  //   </ListItem>
  // ))

  return (
    <>
      <div {...getRootProps({ className: 'dropzone' })}>
        <CustomTextField {...getInputProps()} {...field} fullWidth />

        <div className='flex items-center flex-col border rounded-md p-10 md:p-20'>
          <Avatar variant='rounded' className='bs-12 is-12 mbe-9'>
            <i className='tabler-upload' />
          </Avatar>
          <Typography variant='h4' className='mbe-2.5'>
            Drop files here or click to upload.
          </Typography>
          <Typography>Allowed *.jpeg, *.jpg, *.png, *.gif</Typography>
          <Typography>Max 2 files and max size of 2 MB</Typography>
        </div>
      </div>
      {/* {files.length ? (
        <>
          <List>{fileList}</List>
          <div className='buttons'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove All
            </Button>
            <Button variant='contained'>Upload Files</Button>
          </div>
        </>
      ) : null} */}
    </>
  )
}

export default CustomFileUploader
