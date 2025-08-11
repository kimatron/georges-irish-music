'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '../lib/CartContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state } = useCart()

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-emerald-600 transition-colors">
              <span className="text-emerald-600">George&apos;s</span> Irish Music
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Browse Music
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-emerald-600 transition-colors">
              About George
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Contact
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Admin
            </Link>
          </nav>

          {/* Cart & User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors">
              🛒
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </Link>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors">
              Account
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="text-2xl">☰</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Browse Music
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Categories
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-emerald-600 transition-colors">
                About George
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Contact
              </Link>
              <Link href="/admin" className="text-gray-700 hover:text-emerald-600 transition-colors">
                Admin
              </Link>
              <div className="flex items-center space-x-4 pt-4 border-t">
                <Link href="/cart" className="flex items-center space-x-2 text-gray-700">
                  <span>🛒</span>
                  <span>Cart ({state.itemCount})</span>
                </Link>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg">
                  Account
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}