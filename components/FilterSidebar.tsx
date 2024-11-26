'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Slider } from '@/components/ui/slider'

export default function FilterSidebar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sort, setSort] = useState('newest')

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    setSelectedCategory(searchParams.get('category'))
    setPriceRange([
      Number(searchParams.get('minPrice')) || 0,
      Number(searchParams.get('maxPrice')) || 1000,
    ])
    setSort(searchParams.get('sort') || 'newest')
  }, [searchParams])

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (selectedCategory) params.set('category', selectedCategory)
    params.set('minPrice', priceRange[0].toString())
    params.set('maxPrice', priceRange[1].toString())
    params.set('sort', sort)
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="w-64 bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="mb-4">
        <h3 className="font-medium mb-2">Category</h3>
        <select
          value={selectedCategory || ''}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
          className="w-full p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <h3 className="font-medium mb-2">Price Range</h3>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
        />
        <div className="flex justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-medium mb-2">Sort By</h3>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="newest">Newest</option>
          <option value="price_low_high">Price: Low to High</option>
          <option value="price_high_low">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
      <button
        onClick={applyFilters}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  )
}

