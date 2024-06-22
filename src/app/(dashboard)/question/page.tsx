// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports

import type { QuestionType } from './UserListTable'
import UserListTable from './UserListTable'
import UserListCards from './UserListCards'

const data: QuestionType[] = [
  {
    id: '1',
    question:
      'Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator. Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator. Reference site about Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
    type: 'Long',
    category: 'Photographer',
    date: '13 Jun 2024'
  },
  {
    id: '2',
    question: 'Lorem Ipsum, giving information on its origins, as well as a random Lipsum generator.',
    type: 'Short',
    category: 'Beauty',
    date: '13 Jun 2024'
  }
]

export default function page() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListCards />
      </Grid>
      <Grid item xs={12}>
        <UserListTable tableData={data || []} />
      </Grid>
    </Grid>
  )
}
