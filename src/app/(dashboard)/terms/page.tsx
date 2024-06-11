// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import type { BlogsType } from './UserListTable'
import UserListTable from './UserListTable'

const data: BlogsType[] = [
  {
    title: 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
    status: 'published',
    date: '13 Jun 2024',
    version: '1.0.2'
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
