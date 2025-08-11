'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '../../lib/CartContext'
import Link from 'next/link'

interface OrderDetails {
  id: string
  total: number
  customerEmail: string
  items: Array<{
    title: string
    artist: string
    quantity: number
    price: number
  }>
}

export default function OrderSuccess() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { dispatch } = useCart()
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const processSuccessfulOrder = async () => {
      if (!sessionId) {
        setError('No session ID found')
        setLoading(false)
        return
      }

      try {
        // Verify the Stripe session and create order
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId })
        })

        if (response.ok) {
          const orderData = await response.json()
          setOrder(orderData)
          
          // Clear the cart since payment was successful
          dispatch({ type: 'CLEAR_CART' })
        } else {
          setError('Failed to verify payment')
        }
      } catch (err) {
        console.error('Error processing order:', err)
        setError('Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    processSuccessfulOrder()
  }, [sessionId, dispatch])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow p-8">
              <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Processing your order...
              </h1>
              <p className="text-gray-600">
                Please wait while we confirm your payment with Stripe.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow p-8">
              <div className="text-6xl mb-4">❌</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Order Processing Failed
              </h1>
              <p className="text-gray-600 mb-6">
                {error}. Please contact us for assistance.
              </p>
              <div className="space-y-4">
                <Link 
                  href="/cart"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold inline-block"
                >
                  Return to Cart
                </Link>
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

  if (!order) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your order! George will carefully pack your Irish music CDs and ship them soon.
            </p>
            
            {/* Order Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h2 className="text-lg font-semibold mb-4">Order Details</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-mono text-sm">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span>{order.customerEmail}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Paid:</span>
                  <span className="text-emerald-600">€{order.total.toFixed(2)}</span>
                </div>
              </div>
              
              <h3 className="font-semibold mb-2">Items Ordered:</h3>
              <div className="space-y-1">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.title} - {item.artist}</span>
                    <span>€{(item.quantity * item.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-gray-600 mb-8">
              You&apos;ll receive an email confirmation shortly with tracking information.
            </p>
            
            <div className="space-y-4">
              <Link 
                href="/products"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold inline-block"
              >
                Continue Shopping
              </Link>
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