import Grid from '@mui/material/Grid'
import FormValidationBasic from './FormValidationBasic'
import UserListTable from './UserListTable'

const data = [
  {
    title: 'Take guest RSVPs to ensure the right gathering estimate is given to venues'
  }
]
export default function page() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <FormValidationBasic />
      </Grid>
      <Grid item xs={12}>
        <UserListTable tableData={data} />
      </Grid>
    </Grid>
  )
}
