import { NextResponse } from "next/server"
// @ts-ignore
import { formatLineItems } from "use-shopping-cart/utilities"

import { inventory } from "@/config/inventory"
import { stripe } from "@/lib/stripe"

export async function POST(request: Request) {
    /* */
    
    const cartDetails = await request.json()
    const lineItems = [];

    for (const id in cartDetails) {
      const quantity = cartDetails[id].quantity;
      const price = cartDetails[id].price
      //const totalItemPrice = calculateTotalItemPrice(id, quantity);  // Calculate total price for each item
      lineItems.push(
        { price_data: 
            { 
                currency: 'usd', 
                product_data: { 
                    name: cartDetails[id].nom 
                }, unit_amount: price }, quantity: quantity }
        );
  
    }
    //const lineItems = formatLineItems(cartDetails)
    console.log(lineItems)
    const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ['card'],
        line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "Sample Product",
                },
                unit_amount: 1000,
              },
              quantity: 1,
            },
          ],
        success_url: `${request.headers.get("origin")}/api/checkout/success?true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${request.headers.get("origin")}/?canceled=true`
    })

    return NextResponse.json(session)
}
