"use client"

import { useState } from "react"

export default function EmailInput() {

  const [email, setEmail] = useState("")

  async function handleAddSuscriber(email) {

    try {



    } catch (err) {

      console.log("Error al suscribirse: ", err.message)

    }
    
  }

    return (

        <div className="sign-up">

          <input value={email} onChange={(e) => {

            setEmail(e.target.value)

          }} placeholder="correo@dominio.com" />
          <button className="button-card">Suscribirse</button>

        </div>

    )

}