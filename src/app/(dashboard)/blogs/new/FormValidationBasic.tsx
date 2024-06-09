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

// Styled Component Imports

type FormValues = {
  image: string
  title: string
  description: string
  category: string
}

const FormValidationBasic = () => {
  // Hooks
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      image: undefined,
      title: undefined,
      description: undefined
    }
  })

  const onSubmit = () => toast.success('Form Submitted')

  return (
    <Card>
      <CardHeader title='Add New Blog' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12}>
              <Controller
                name='title'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    fullWidth
                    label='Title'
                    placeholder='Title'
                    {...(errors.title && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name='description'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    {...field}
                    rows={4}
                    fullWidth
                    multiline
                    label='Description'
                    placeholder='Description'
                    {...(errors.description && { error: true, helperText: 'This field is required.' })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name='image'
                control={control}
                rules={{ required: true }}
                render={({ field }) => <FileUploaderRestrictions />}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
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

            <Grid item xs={12} className='flex gap-4'>
              <Button variant='contained' type='submit'>
                Submit
              </Button>
              <Button variant='tonal' color='secondary' type='reset' onClick={() => reset()}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormValidationBasic
