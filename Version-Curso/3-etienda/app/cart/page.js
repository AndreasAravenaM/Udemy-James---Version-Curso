"use client"

import { useProducts } from "@/context/ProductContext"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartPage() {

  const {cart, handleIncrementProduct} = useProducts()
  const router = useRouter()

  const total = Object.keys(cart).reduce((acc, curr, currIndex) => {

    const subTotal = (cart[curr].prices[0].unit_amount)/100 * cart[curr].quantity
    const sum = acc + parseInt(subTotal)

    return sum

  },0)

  async function createCheckout() {

    try {

      const baseURL = process.env.NEXT_PUBLIC_BASE_URL

      const lineItems = Object.keys(cart).map((item, itemIndex) => {

        return {

            price: item,
            quantity: cart[item].quantity

        }

      })

      const response = await fetch(baseURL + '/api/checkout', {

        method: 'POST',

        headers: {

            'Content-type': 'application/json'

        },

        body: JSON.stringify({ lineItems })

      })

      const data = await response.json()

      if(response.ok) {

        router.push(data.url)

      }

    } catch(err) {

      console.log("Error al crear pago: ", err.message)

    }
    
  }

  return (
    
    <div>

      <section className="cart-section">

        <h2>Tu carro</h2>

        {Object.keys(cart).length === 0 && (<p>No hay nada en tu carro. Todavía.</p>)}

        <div className="cart-container">

          {Object.keys(cart).map((item, itemIndex) => {

              const itemData = cart[item]
              const itemName = itemData.name
              const itemDescription = itemData.description
              const itemQuantity = itemData?.quantity
              const itemPrice = (itemData.prices[0].unit_amount)/100 

              const imgName = itemData.name === "Calendario \"Dragon Medieval\"" ? 
              
                "planner" : 
                itemName.replaceAll(" Sticker.jpeg", "").replaceAll(" ", "_")

              const ImgUrl = "low_res/" + imgName + ".jpeg"

              return (

                <div key={itemIndex} className="cart-item">

                  <img src={ImgUrl} alt={imgName + "-image"} />

                  <div className="cart-item-info">

                    <h3>{itemName}</h3>
                    <p>{itemDescription.slice(0, 100)}{itemDescription.length > 100 ? "..." : ""}</p>
                    <h4>${itemPrice}</h4>

                    <div className="quantity-container">

                      <p><strong>Cantidad</strong></p>
                      <input type="number" value={itemQuantity} placeholder="2" onChange={(e) => {

                        const newValue = e.target.value

                        handleIncrementProduct(itemData.default_price, newValue, itemData, true)

                      }} />

                    </div>

                  </div>

                </div>

              )

          })}

        </div>

        <div className="total-container">

          <h2><strong>Total:</strong> ${total}</h2>

        </div>

        <div className="checkout-container">

          <Link href="/">
          
           <button>&larr; Seguir comprando</button>
          
          </Link>

          <button onClick={createCheckout}>Realizar Comprar &rarr;</button>

        </div>

      </section>

    </div>
    
  );
}