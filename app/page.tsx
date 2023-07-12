import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

import { SanityProduct } from "@/config/inventory"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"
import { seedSanityData } from "@/lib/seed"

interface Props {
  searchParams: {
    date?: string
    price?: string
    search?: string
    color?: string
    category?: string
    size?: string
  }
} 

export default async function Page({searchParams} : Props) {
  const { date = "desc", price,color, category,size, search } = searchParams
  const priceOrder = searchParams.price ? `| order(price ${searchParams.price})` : ""
  const dateOrder = searchParams.date ? `| order(_createdAt ${searchParams.price})` : ""
  const order = `${priceOrder}${dateOrder}`

  const productFilter = `_type == "product"`
  const colorFilter = color ?`&& "${color}" in colors` : ""
  const categoryFilter = category ?`&& "${category}" in categories` : ""
  const sizeFilter = size ?`&& "${size}" in sizes` : ""
  const searchFilter = search ? `&& name match "${search}"` : ""

  const filter = `*[${productFilter}${colorFilter}${categoryFilter}${sizeFilter}${searchFilter}]`
  const products = await client.fetch<SanityProduct[]>(
     groq` *[_type == "produit"] `
  )

  console.log(products)

  return (
    <div>
      <div className="px-4 pt-20 text-center">
        <h1 className="text-4xl font-extrabold tracking-normal">{siteConfig.name}</h1>
        <p className="mx-auto mt-4 max-w-3xl text-base">{siteConfig.description}</p>
      </div>
      <div>
        <main className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {products.length} produits
            </h1>
            {/* Product Sort */}
            <ProductSort />
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Produits
            </h2>
            <div className={
              cn("grid grid-cols-1 gap-x-8 gap-y-10",
              products.length > 0
              ? "lg:grid-cols-4"
              : "lg:grid-cols-[1fr_3fr]"
              )}
              >
              <div className="xs:hidden lg:block">
                {/* Product filtre */}
                <ProductFilters />
                </div>
                {/* Product grid */}
                <ProductGrid products={products}/>
            </div>
          </section>
        </main>
      </div>
    </div>
  )

}