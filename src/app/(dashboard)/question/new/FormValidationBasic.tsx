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
  question: string
  questionType: string
  vendorType: string
  required: boolean
  shortQuestion: string
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
      question: '',
      questionType: '',
      vendorType: '',
      required: true,
      shortQuestion: ''
    }
  })

  const onSubmit = (value: any) => {
    console.log(value)
    toast.success('Form Submitted')
  }

  return (
    <Card>
      <CardHeader question='Add New Question' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Controller
                name='question'
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='Question'
                      {...(errors.question && { error: true, helperText: 'This field is required.' })}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='shortQuestion'
                control={control}
                rules={{ required: true }}
                render={({ field }) => {
                  return (
                    <CustomTextField
                      {...field}
                      fullWidth
                      label='shortQuestion'
                      {...(errors.shortQuestion && { error: true, helperText: 'This field is required.' })}
                    />
                  )
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name='questionType'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Question Type'
                    {...field}
                    error={Boolean(errors.questionType)}
                  >
                    <MenuItem value=''>Select Question Type</MenuItem>
                    <MenuItem value='Food'>Short</MenuItem>
                    <MenuItem value='Long'>Long</MenuItem>
                    <MenuItem value='Multiple Choice'>Multiple Choice</MenuItem>
                    <MenuItem value='Long'>Long</MenuItem>
                    <MenuItem value='Radio'>Radio</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.questionType && <FormHelperText error>This field is required.</FormHelperText>}
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
