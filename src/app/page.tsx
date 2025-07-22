export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            George Gilsenan's
            <span className="block text-emerald-600">Irish Music</span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Celebrating 40 years of Irish musical tradition from Kells to Wexford.
            Discover authentic Irish country, traditional, and folk music 
            curated by a lifetime of passion.
          </p>

          <div className="space-y-4 mb-12">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
              Browse Music Collection
            </button>
            <p className="text-gray-600">
              Over 1,000 CDs of Irish music heritage
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Traditional Irish
            </h3>
            <p className="text-gray-600">
              Authentic traditional music from every county in Ireland
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Irish Country
            </h3>
            <p className="text-gray-600">
              The best of Irish country music spanning four decades
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Folk & Ballads
            </h3>
            <p className="text-gray-600">
              Stories and songs that capture the Irish spirit
            </p>
          </div>
        </div>

        {/* About George Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            About George
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              At 92 years young, George Gilsenan has spent four decades sharing 
              the beauty of Irish music. From his roots in Kells, County Meath, 
              to his home in Wexford, George's passion for authentic Irish music 
              has never wavered.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Every CD in our collection has been personally selected by George, 
              ensuring you receive not just music, but a piece of Irish cultural heritage.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}