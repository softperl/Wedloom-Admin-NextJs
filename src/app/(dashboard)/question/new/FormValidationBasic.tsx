'use client'

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
import CustomTextField from '@core/components/mui/TextField'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import { usePathname, useRouter } from 'next/navigation'

type FormValues = {
  image: string
  title: string
  shortDescription: string
  description: string
  category: string
  seokeywords: string[]
  status: string
  author: string
  tags: string[]
}

const FormValidationBasic = () => {
  const router = useRouter()
  const pathname = usePathname()

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      image: undefined,
      title: '',
      shortDescription: '',
      description: '',
      seokeywords: [],
      category: undefined,
      status: 'Published',
      author: 'Admin'
    }
  })

  const onSubmit = (value: any) => {
    console.log(value)
    toast.success('Form Submitted')
  }

  return (
    <Card>
      <CardHeader title='Add New Question' />
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

            <Grid item xs={12} className='flex gap-4'>
              <Button variant='contained' type='submit'>
                Submit
              </Button>
              <Button variant='tonal' color='secondary' type='button' onClick={() => router.back()}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormValidationBasic
