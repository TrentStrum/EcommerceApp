'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, User, Search, Menu } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const { cartItems } = useCart()
  const { user } = useAuth()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <img className="h-8 w-auto" src="/logo.svg" alt="WorldClass E-commerce" />
            </Link>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              <Link href="/products" className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Products
              </Link>
              <Link href="/categories" className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Categories
              </Link>
              <Link href="/deals" className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Deals
              </Link>
            </nav>
          </div>
          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="flex items-center">
            <Link href="/cart" className="ml-4 flow-root text-gray-400 hover:text-gray-500 lg:ml-8">
              <span className="relative inline-block">
                <ShoppingCart className="h-6 w-6" aria-hidden="true" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 rounded-full bg-indigo-600 text-xs text-white flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </span>
            </Link>
            {user ? (
              <Link href="/account" className="ml-4 text-gray-400 hover:text-gray-500 lg:ml-8">
                <User className="h-6 w-6" aria-hidden="true" />
              </Link>
            ) : (
              <Link href="/login" className="ml-4 text-gray-400 hover:text-gray-500 lg:ml-8">
                Sign In
              </Link>
            )}
            <button
              type="button"
              className="ml-4 bg-white p-2 rounded-md text-gray-400 lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/products" className="text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
              Products
            </Link>
            <Link href="/categories" className="text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
              Categories
            </Link>
            <Link href="/deals" className="text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium">
              Deals
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

