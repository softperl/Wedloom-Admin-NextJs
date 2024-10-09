// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { UserDataType } from '@components/card-statistics/HorizontalWithSubtitle'

// Component Imports
import HorizontalWithSubtitle from '@components/card-statistics/HorizontalWithSubtitle'

// Vars
const data: UserDataType[] = [
  {
    title: 'Total Vendors',
    value: '21,459',
    avatarIcon: 'tabler-users',
    avatarColor: 'primary',
    change: 'positive',
    changeNumber: '29%',
    subTitle: 'Total User'
  },
  {
    title: 'Active Vendors',
    value: '4,567',
    avatarIcon: 'tabler-user-plus',
    avatarColor: 'error',
    change: 'positive',
    changeNumber: '18%',
    subTitle: 'Last week analytics'
  },
  {
    title: 'Block Vendors',
    value: '19,860',
    avatarIcon: 'tabler-user-check',
    avatarColor: 'success',
    change: 'negative',
    changeNumber: '14%',
    subTitle: 'Last week analytics'
  },
  {
    title: 'Monthly Vendors',
    value: '237',
    avatarIcon: 'tabler-user-search',
    avatarColor: 'warning',
    change: 'positive',
    changeNumber: '42%',
    subTitle: 'Last week analytics'
  }
]

const UserListCards = () => {
  return (
    <Grid container spacing={6}>
      {data.map((item, i) => (
        <Grid key={i} item xs={12} sm={6} md={3}>
          <HorizontalWithSubtitle {...item} />
        </Grid>
      ))}
    </Grid>
  )
}

export default UserListCards
