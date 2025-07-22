import Image from 'next/image'

export default function ProductsPage() {
  // Mock data for now - we'll connect to a database later
  const products = [
    {
      id: 1,
      title: "The Best of Irish Country",
      artist: "Various Artists",
      price: 15.99,
      image: "https://via.placeholder.com/200x200/047857/ffffff?text=CD",
      category: "Irish Country"
    },
    {
      id: 2,
      title: "Traditional Irish Fiddle Music",
      artist: "Kevin Burke",
      price: 18.99,
      image: "https://via.placeholder.com/200x200/047857/ffffff?text=CD",
      category: "Traditional"
    },
    {
      id: 3,
      title: "Celtic Folk Tales",
      artist: "The Dubliners",
      price: 16.99,
      image: "https://via.placeholder.com/200x200/047857/ffffff?text=CD",
      category: "Folk"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Our Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover George&apos;s carefully curated selection of Irish music, 
            spanning four decades of authentic sounds from the Emerald Isle.
          </p>
        </div>

        {/* Filters - We'll enhance this later */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg">
            All Music
          </button>
          <button className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
            Traditional
          </button>
          <button className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
            Country
          </button>
          <button className="bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
            Folk
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image 
                  src={product.image} 
                  alt={product.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                  {product.artist}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-emerald-600">
                    €{product.price}
                  </span>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded text-sm transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if no products (we'll use this later) */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found. George is adding more music soon!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}