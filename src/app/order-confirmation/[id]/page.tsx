export default function OrderConfirmation({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow p-8">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your order! George will carefully pack your Irish music CDs and ship them soon.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Order Number</p>
              <p className="font-mono text-lg font-semibold">{params.id}</p>
            </div>
            <p className="text-gray-600 mb-8">
              You&apos;ll receive an email confirmation shortly with tracking information.
            </p>
            <div className="space-y-4">
              <a 
                href="/products"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold inline-block"
              >
                Continue Shopping
              </a>
              <p className="text-sm text-gray-500">
                Questions? Call George: +353 53 123 4567
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}