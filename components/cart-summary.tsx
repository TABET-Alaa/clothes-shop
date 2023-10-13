"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

import { Button } from "@/components/ui/button"
import getStipePromise from "@/lib/stripe"
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
    const stripe = await getStipePromise();

    const response = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify(cartDetails)
    })
    
    const data = await response.json()
    console.log("12344444444444444444",data.session)
    
    const sessionId = data.session.id 
    //if (data.session) {
     stripe?.redirectToCheckout({"sessionId": sessionId});
    //}
    //const result = await redirectToCheckout(sessionId)


   /* if (result?.error){
      console.error(result)
    }*/
  }
  function onChekout2(){
    window.location.href ="https://checkout.stripe.com/c/pay/cs_test_a1pNDsdfDzQJ6eBDruT5Pujd8j78AA38yTk9z1jABEIFKEDOsQW7qG5lCV#fidkdWxOYHwnPyd1blpxYHZxWjA0S3V0MVBONzNtSzxRVnN3fWlcbHJ8UnNGYjM2bnJiV0RDRlFtaUM9XE1BUWx3R31VclE1fXxsZFJEbXdXaEprcDV%2FMTxqT0dRfHRtckYyUVI0T0k0UW9uNTVObj02RkNTRycpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl"; 

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
        <Button onClick={onCheckout} type="button" className="w-full">
          Commander
        </Button>
      </div>
    </section>
  )
}
