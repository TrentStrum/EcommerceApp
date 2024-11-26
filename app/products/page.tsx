'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import FilterSidebar from '@/components/FilterSidebar'
import { Product } from '@/types/product'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const category = searchParams.get('category')
      const minPrice = searchParams.get('minPrice')
      const maxPrice = searchParams.get('maxPrice')
      const sort = searchParams.get('sort') || 'newest'

      const response = await fetch(`/api/products?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}`)
      const data = await response.json()
      setProducts(data)
      setLoading(false)
    }

    fetchProducts()
  }, [searchParams])

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <FilterSidebar />
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

