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
  inputType: string
  showShortQuestion: boolean
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
      vendorType: 'All',
      required: true,
      shortQuestion: '',
      inputType: 'Text + Number',
      showShortQuestion: true
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
            <Grid item xs={6}>
              <Controller
                name='vendorType'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField select fullWidth label='Vendor Type' {...field} error={Boolean(errors.vendorType)}>
                    <MenuItem value=''>Select Vendor Type</MenuItem>
                    <MenuItem value='All'>All</MenuItem>
                    <MenuItem value='Photographer'>Photographer</MenuItem>
                    <MenuItem value='Beauty'>Beauty</MenuItem>
                    <MenuItem value='Developer'>Developer</MenuItem>
                    <MenuItem value='Venue'>Venue</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.vendorType && <FormHelperText error>This field is required.</FormHelperText>}
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='required'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField select fullWidth label='Is Required' {...field} error={Boolean(errors.required)}>
                    <MenuItem value=''>Select</MenuItem>
                    <MenuItem value='false'>Not Required</MenuItem>
                    <MenuItem value='true'>Required</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.required && <FormHelperText error>This field is required.</FormHelperText>}
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='inputType'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField select fullWidth label='Input Type' {...field} error={Boolean(errors.inputType)}>
                    <MenuItem value=''>Select Input Type</MenuItem>
                    <MenuItem value='Text + Number'>Text + Number</MenuItem>
                    <MenuItem value='File'>File</MenuItem>
                    <MenuItem value='Number'>Number</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.inputType && <FormHelperText error>This field is required.</FormHelperText>}
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
                      label='Short Question'
                      {...(errors.shortQuestion && { error: true, helperText: 'This field is required.' })}
                    />
                  )
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name='showShortQuestion'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label='Show Short Question'
                    {...field}
                    error={Boolean(errors.showShortQuestion)}
                  >
                    <MenuItem value=''>Select Show Short Question</MenuItem>
                    <MenuItem value='true'>Yes</MenuItem>
                    <MenuItem value='false'>No</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.inputType && <FormHelperText error>This field is required.</FormHelperText>}
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
