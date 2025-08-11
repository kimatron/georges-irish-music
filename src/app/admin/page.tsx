'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface DashboardStats {
  totalProducts: number
  ordersToday: number
  totalRevenue: number
  featuredItems: number
  lowStockItems: number
  recentOrders: Array<{
    id: string
    customerEmail: string
    total: number
    createdAt: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    ordersToday: 0,
    totalRevenue: 0,
    featuredItems: 0,
    lowStockItems: 0,
    recentOrders: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            George&apos;s Music Store Admin
          </h1>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Products Management */}
            <Link href="/admin/products" className="group">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="text-emerald-600 text-3xl mb-4">🎵</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Manage Products
                </h2>
                <p className="text-gray-600">
                  Add, edit, and organize your music collection
                </p>
                <div className="mt-4 text-emerald-600 group-hover:text-emerald-700">
                  View Products →
                </div>
              </div>
            </Link>

            {/* Orders */}
            <Link href="/admin/orders" className="group">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="text-emerald-600 text-3xl mb-4">📦</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Customer Orders
                </h2>
                <p className="text-gray-600">
                  View and manage customer orders
                </p>
                <div className="mt-4 text-emerald-600 group-hover:text-emerald-700">
                  View Orders →
                </div>
              </div>
            </Link>

            {/* Settings (placeholder) */}
            <div className="bg-white p-6 rounded-lg shadow opacity-50">
              <div className="text-gray-400 text-3xl mb-4">⚙️</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Settings
              </h2>
              <p className="text-gray-600">
                Store settings and configuration
              </p>
              <div className="mt-4 text-gray-400">
                Coming Soon
              </div>
            </div>
          </div>

          {/* Real Stats */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Business Overview
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {stats.totalProducts}
                </div>
                <div className="text-sm text-gray-600">Total Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {stats.ordersToday}
                </div>
                <div className="text-sm text-gray-600">Orders Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  €{stats.totalRevenue.toFixed(0)}
                </div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {stats.featuredItems}
                </div>
                <div className="text-sm text-gray-600">Featured Items</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${stats.lowStockItems > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                  {stats.lowStockItems}
                </div>
                <div className="text-sm text-gray-600">Low Stock</div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          {stats.recentOrders.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Orders
              </h3>
              <div className="space-y-3">
                {stats.recentOrders.map((order) => (
                  <div key={order.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium text-sm">#{order.id.slice(-8)}</p>
                      <p className="text-gray-600 text-xs">{order.customerEmail}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-emerald-600">€{order.total.toFixed(2)}</p>
                      <p className="text-gray-600 text-xs">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link 
                  href="/admin/orders"
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                >
                  View All Orders →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}