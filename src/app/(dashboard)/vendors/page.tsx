// Component Imports
import { fetchFn } from '@/lib/servet-utils'
import UserList from './UserListTable'

const UserListApp = async ({
  searchParams
}: {
  searchParams?: {
    q?: string
    page?: string
    perPage?: string
  }
}) => {
  const q = searchParams?.q || ''
  const currentPage = Number(searchParams?.page) || 1
  const perPage = Number(searchParams?.perPage) || 50
  let data = null
  let totalPages = 1
  let total = 0
  try {
    data = await fetchFn(`/admin/auth/get-all-users?q=${q}&page=${currentPage}&perPage=${perPage}`, {
      method: 'GET',
      next: {
        revalidate: 0,
        tags: ['users']
      }
    })
    console.log(data)

    totalPages = data.totalPages
    total = data.total
  } catch (error) {
    console.log(error)
  }

  return <UserList tableData={data?.users || []} />
}

export default UserListApp
