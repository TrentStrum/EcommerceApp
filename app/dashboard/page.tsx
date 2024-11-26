import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { getUserOrders } from '@/lib/orders'
import DashboardNav from '@/components/DashboardNav'
import OrderHistory from '@/components/OrderHistory'
import AccountDetails from '@/components/AccountDetails'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const orders = await getUserOrders(session.user.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <DashboardNav />
        <div className="flex-1">
          <AccountDetails user={session.user} />
          <OrderHistory orders={orders} />
        </div>
      </div>
    </div>
  )
}

