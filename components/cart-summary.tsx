"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

import { Button } from "@/components/ui/button"
const products = [
  {product:1,
  name: "Stripe Product",
  price: 20
}
]
export function CartSummary() {
  const { formattedTotalPrice, totalPrice, cartDetails, cartCount, redirectToCheckout } =  useShoppingCart()
  //const shippingAmount = cartCount!  > 0 ? 500 : 0
  const shippingAmount = 20
  const totalAmount = totalPrice! + shippingAmount
  async function onCheckout() {
    console.log('cartDetails:',cartDetails)
    const response = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(cartDetails)
    })

    const data = await response.json()
    

    const result = await redirectToCheckout(data.id)


    if (result?.error){
      console.error(result)
    }
  }

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md dark:border-gray-900 dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium">
        Récapitulatif de la commande
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm">Commande</dt>
          <dd className="text-sm font-medium">{totalPrice} DH</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span>Livraison</span>
          </dt>
          <dd className="text-sm font-medium">{shippingAmount} DH</dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">Total </dt>
          <dd className="text-base font-medium">{totalAmount} DH</dd>
        </div>
      </dl>

      <div className="mt-6">
        <Button onClick={onCheckout} className="w-full">
          Commander
        </Button>
      </div>
    </section>
  )
}
