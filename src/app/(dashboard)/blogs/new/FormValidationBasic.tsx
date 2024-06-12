'use client'

// React Imports

// MUI Imports
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'

// Third-party Imports
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

// Components Imports
import MenuItem from '@mui/material/MenuItem'

import FormHelperText from '@mui/material/FormHelperText'

import CustomTextField from '@core/components/mui/TextField'
import FileUploaderRestrictions from '@core/components/mui/FileInputField'
import EditorControlled from './Editor'
import { useRouter } from 'next/navigation'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Tag from './Tag'

// Styled Component Imports

type FormValues = {
  image: string
  title: string
  shortDescription: string
  description: string
  category: string
  seokeywords: string[]
  status: string
  tags: string[]
}

const FormValidationBasic = () => {
  const router = useRouter()
  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      image: undefined,
      title: '',
      shortDescription: '',
      description: '',
      seokeywords: [],
      category: undefined,
      status: 'Draft'
    }
  })

  const onSubmit = (value: any) => {
    console.log(value)
    toast.success('Form Submitted')
  }

  return (
    <Card>
      <CardHeader title='Add New Blog' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <Controller
                name='title'
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  const length = field.value ? Number(field.value.length) : 0
                  const count = 145 - length
                  const handleChange = (event: any) => {
                    if (event.target.value.length <= 400) {
                      field.onChange(event)
                    }
                  }
                  return (
                    <div className='relative'>
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Title'
                        onChange={handleChange}
                        {...(errors.title && { error: true, helperText: 'This field is required.' })}
                      />
                      <label className='absolute -top-0.5 right-0 z-10 mb-1 text-sm'>
                        You have remains {count} character
                      </label>
                    </div>
                  )
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name='category'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField select fullWidth label='Category' {...field} error={Boolean(errors.category)}>
                    <MenuItem value=''>Select Category</MenuItem>
                    <MenuItem value='Food'>Food</MenuItem>
                    <MenuItem value='Gold'>Gold</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.category && <FormHelperText error>This field is required.</FormHelperText>}
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='shortDescription'
                control={control}
                rules={{
                  required: true,
                  maxLength: {
                    value: 145,
                    message: 'Maximum length is 145 characters'
                  }
                }}
                render={({ field }) => {
                  const length = field.value ? Number(field.value.length) : 0
                  const count = 400 - length
                  const handleChange = (event: any) => {
                    if (event.target.value.length <= 400) {
                      field.onChange(event)
                    }
                  }

                  return (
                    <div className='relative'>
                      <CustomTextField
                        {...field}
                        fullWidth
                        multiline
                        rows={4}
                        label='Short Description'
                        placeholder='Short Description'
                        onChange={handleChange}
                        {...(errors.shortDescription && { error: true, helperText: 'This field is required.' })}
                      />
                      <label className='absolute -top-0.5 right-0 z-10 mb-1 text-sm'>
                        You have remains {count} character
                      </label>
                    </div>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name='seokeywords'
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='SEO Keywords'
                      placeholder='SEO Keywords'
                      {...(errors.seokeywords && { error: true, helperText: 'This field is required.' })}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name='tags'
                control={control}
                render={({ field }) => {
                  return <Tag {...field} label='Tags' />
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <EditorControlled />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='image'
                control={control}
                rules={{ required: true }}
                render={({}) => <input type='file' />}
              />
            </Grid>
            <Grid item xs={2}>
              <Controller
                name='status'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField select fullWidth label='Status' {...field} error={Boolean(errors.category)}>
                    <MenuItem value=''>Select Status</MenuItem>
                    <MenuItem value='Published'>Published</MenuItem>
                    <MenuItem value='Draft'>Draft</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.category && <FormHelperText error>This field is required.</FormHelperText>}
            </Grid>
            <Grid item xs={2}>
              <FormControlLabel control={<Switch defaultChecked name='featured' />} label='Is Featured' />
              <FormControlLabel control={<Switch defaultChecked name='comments' />} label='Comments' />
            </Grid>

            <Grid item xs={12} className='flex gap-4'>
              <Button variant='contained' type='submit'>
                Submit
              </Button>
              <Button variant='tonal' color='secondary' type='button' onClick={() => router.back()}>
                Cancle
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormValidationBasic
