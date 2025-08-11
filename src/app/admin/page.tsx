import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            George&apos;s Music Store Admin
          </h1>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            {/* Orders - NOW ENABLED! */}
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

          {/* Quick Stats */}
          <div className="mt-12 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Overview
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">5</div>
                <div className="text-sm text-gray-600">Total Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">0</div>
                <div className="text-sm text-gray-600">Orders Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">3</div>
                <div className="text-sm text-gray-600">Featured Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">€89</div>
                <div className="text-sm text-gray-600">Total Value</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}