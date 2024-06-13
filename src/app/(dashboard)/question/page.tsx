// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import type { BlogsType } from './UserListTable'
import UserListTable from './UserListTable'

const data: BlogsType[] = [
  {
    question:
      'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
    questionType: 'Long',
    vendorType: 'Photographer',
    required: true,
    date: '13 Jun 2024'
  },
  {
    question: 'Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
    questionType: 'Short',
    vendorType: 'Beauty',
    required: false,
    date: '13 Jun 2024'
  }
]

export default function page() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListTable tableData={data} />
      </Grid>
    </Grid>
  )
}
