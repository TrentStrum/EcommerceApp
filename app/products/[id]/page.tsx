import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getProductById, getRelatedProducts } from '@/lib/products'
import AddToCartButton from '@/components/AddToCartButton'
import ProductReviews from '@/components/ProductReviews'
import RelatedProducts from '@/components/RelatedProducts'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.id, product.category)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="md:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>
          <AddToCartButton product={product} />
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Product Details</h2>
            <ul className="list-disc list-inside">
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ProductReviews productId={product.id} />
      <RelatedProducts products={relatedProducts} />
    </div>
  )
}

