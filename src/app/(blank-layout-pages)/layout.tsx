// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'
import { AuthProviders } from '@/components/AuthProvider'

type Props = ChildrenType

const Layout = ({ children }: Props) => {
  // Vars
  const direction = 'ltr'
  const systemMode = getSystemMode()

  return (
    <AuthProviders>
      <Providers direction={direction}>
        <BlankLayout systemMode={systemMode}>{children}</BlankLayout>
      </Providers>
    </AuthProviders>
  )
}

export default Layout
