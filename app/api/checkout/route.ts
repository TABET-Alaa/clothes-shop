import { NextResponse } from "@next/server";
// @ts-ignore
import { formatLineItems } from "use-shopping-cart/utilities"

import { inventory } from "@/config/inventory"
import Stripe from "stripe";
//import { stripe } from "@/lib/stripe"

const key = process.env.STRIPE_SECRET_KEY || "";

export const stripe = new Stripe(key , {
  apiVersion: "2022-11-15",
})

export async function POST(request: Request) {
    /* */
        const origin =  request.headers.get('origin')

    const cartDetails = await request.json()
    console.log("cartDetails: ", cartDetails)
    const lineItems =  [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Sample Product 2",
          },
          unit_amount: 110,
        },
        quantity: "h",
      },
    ] ;
    interface FormattedData {
      price_data: {
        currency: string;
        product_data: {
          name: string;
        };
        unit_amount: number;
      };
      quantity: number;
    }
    
    const formattedDataArray: FormattedData[] = [];

    Object.keys(cartDetails).forEach(uniqueId => {
      const { name, price, quantity } = cartDetails[uniqueId];
    
      const formattedData = {
        price_data: {
          currency: 'usd',  // Assuming you want the currency to be in USD
          product_data: {
            name: name,
          },
          unit_amount: price,
        },
        quantity: quantity,
      };
    
      formattedDataArray.push(formattedData);
    });

  
    for (const id in cartDetails) {
      const quantity = cartDetails[id].quantity;
      const price = cartDetails[id].price
      console.log("µµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµ",cartDetails[id].name)
      //const totalItemPrice = calculateTotalItemPrice(id, quantity);  // Calculate total price for each item
      
  
    }
    //const lineItems = formatLineItems(cartDetails)
    console.log("....................",lineItems)
    try {
      if (1) {
     
    const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ['card'],
        line_items: formattedDataArray,
                  success_url: 'https://shop-abdou.vercel.app/success',        //cancel_url: `${request.headers.get("origin")}/?canceled=true`
        //cancel_url: `${request.headers.get("origin")}/?canceled=true`
    })

    return NextResponse.json({session});
  }else{
    return NextResponse.json({message: lineItems});
  }
    }catch(err: any){
      console.log(err)
      return NextResponse.json(err.message)
    }
}
