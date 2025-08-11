'use client'

import { useCart } from '../../lib/CartContext'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity }
    })
  }

  const removeItem = (id: string) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id
    })
  }

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch({ type: 'CLEAR_CART' })
    }
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added any of George&apos;s music to your cart yet.
            </p>
            <Link 
              href="/products"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Browse Music Collection
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Your Cart ({state.itemCount} {state.itemCount === 1 ? 'item' : 'items'})
            </h1>
            <button 
              onClick={clearCart}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Clear Cart
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.imageUrl || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDQ3ODU3Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q0Q8L3RleHQ+PC9zdmc+"}
                          alt={item.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {item.artist}
                        </p>
                        <p className="text-emerald-600 font-semibold">
                          €{item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 p-2"
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="mt-3 pt-3 border-t flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        {item.quantity} × €{item.price.toFixed(2)}
                      </span>
                      <span className="font-semibold text-gray-900">
                        €{(item.quantity * item.price).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({state.itemCount} {state.itemCount === 1 ? 'item' : 'items'})
                    </span>
                    <span className="font-semibold">
                      €{state.total.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      €5.00
                    </span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-lg font-bold text-emerald-600">
                        €{(state.total + 5.00).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-semibold mb-3 transition-colors">
                  Proceed to Checkout
                </button>
                
                <Link 
                  href="/products"
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-lg font-semibold text-center block transition-colors"
                >
                  Continue Shopping
                </Link>

                {/* Trust Signals */}
                <div className="mt-6 pt-6 border-t">
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex items-center">
                      <span className="mr-2">🔒</span>
                      Secure checkout
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">🚚</span>
                      Free shipping over €50
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">↩️</span>
                      30-day returns
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}