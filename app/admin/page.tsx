import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { getAdminStats } from '@/lib/admin'
import AdminNav from '@/components/AdminNav'
import SalesChart from '@/components/SalesChart'
import TopProducts from '@/components/TopProducts'
import RecentOrders from '@/components/RecentOrders'

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    redirect('/')
  }

  const { totalSales, orderCount, productCount, userCount, salesData, topProducts, recentOrders } = await getAdminStats()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <AdminNav />
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Sales" value={`$${totalSales.toFixed(2)}`} />
            <StatCard title="Orders" value={orderCount} />
            <StatCard title="Products" value={productCount} />
            <StatCard title="Users" value={userCount} />
          </div>
          <SalesChart data={salesData} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            <TopProducts products={topProducts} />
            <RecentOrders orders={recentOrders} />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  )
}

