// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import type { BlogsType } from './UserListTable'
import UserListTable from './UserListTable'

const data: BlogsType[] = [
  {
    title: 'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
    author: 'shipon',
    avatar: '',
    categories: 'food',
    status: 'published',
    date: '13 Jun 2024'
  },
  {
    title: 'Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
    author: 'shipon',
    avatar: '',
    categories: 'gold',
    status: 'draft',
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
