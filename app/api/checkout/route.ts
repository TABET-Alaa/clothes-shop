import { NextResponse } from "next/server";
// @ts-ignore
import { formatLineItems } from "use-shopping-cart/utilities"
import { inventory } from "@/config/inventory"
// import Stripe from "stripe";       
import stripe from "@/app/stripeConfig";
//import { stripe } from "@/lib/stripe"

export async function POST(request: Request) {
   
try{
    return NextResponse.json({"session":"session"});
  
    }catch(err: any){
      console.log(err)
      return NextResponse.json(err.message)
    }
}
