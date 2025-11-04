import Stripe from "stripe";
import "../../../envConfig"

const API_KEY = process.env.STRIPE_SECRET_KEY
const stripe = new Stripe(API_KEY)

export async function GET() {

    try {

        const products = await stripe.products.list({ active: true })
        const prices = await stripe.prices.list({ active: true })

        const combinedData = products.data.map((product) => {

            const productPrices = prices.data.filter((price) => {

                return price.product === product.id

            })

            return {

                ...product,
                prices: productPrices.map((price) => {

                    return {

                        id: price.id,
                        unit_amount: price.unit_amount,
                        currency: price.currency,
                        recurring: price.recurring

                    }
                    
                })

            }

        })

        return Response.json(combinedData)

    } catch (err) {

        console.error("Ha ocurrido el siguiente error al conectarse con Stripe:", err.message)
        return Response.json({error: "Ha ocurrido un error al conectarse con Stripe"})

    }

}