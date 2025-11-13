"use client"

import { useAuth } from "@/context/AuthContext"
import { useState } from "react"

export default function SubscriptionForm(props) {

    const categories = ["Entretenimiento", "Música", "Software", "Servicios Web", "Salud y Deporte", "Otro"]
    const currencies = ['USD', 'EUR', 'GBP', 'NZD', "AUD", 'Otro']
    const frequencies = ['Mensualmente', 'Anualmente', 'Trimestralmente', 'Único']
    const methods = ['Tarjeta de Crédito', 'Tarjeta de Débito', 'Paypal', 'Transferencia', "Otro"]
    const statuses = ["Activo", "Pausado", "Cancelado"]

    const {onSubmit, closeInput, formData, handleChangeInput, handleResetForm} = props
    const {handleAddSubscription} = useAuth()

    function handleFormSumbit(e) {

        e.preventDefault()
        handleAddSubscription(formData)
        handleResetForm()
        closeInput()

    }

    return (

        <section>

            <h2>Agrega una nueva subscripción</h2>

            <form onSubmit={handleFormSumbit}>

                <label>

                    <span>Nombre subscripción</span>
                    <input value={formData.name} onChange={handleChangeInput} name="name" type="text" placeholder="Ej: Nexflix" required/>

                </label>

                <label>

                    <span>Categoría</span>

                    <select value={formData.category} onChange={handleChangeInput} name="category">

                        {categories.map((cat, catIndex) => {

                            return (

                                <option key={catIndex}>

                                    {cat}

                                </option>

                            )

                        })}

                    </select>

                </label>

                <label>

                    <span>Costo</span>
                    <input value={formData.cost} onChange={handleChangeInput} type="number" name="cost" step="0.01" placeholder="12.00" required/>

                </label>

                <label>

                        <span>Moneda</span>

                        <select value={formData.currency} onChange={handleChangeInput} name="currency">

                            {currencies.map((cur, curIndex) => {

                                return (

                                    <option key={curIndex}>

                                        {cur}

                                    </option>

                                )

                            })}

                        </select>

                </label>

                <label>

                    <span>Frecuencia de Pago</span>

                    <select value={formData.billingFrequency} onChange={handleChangeInput} name="billingFrequency">

                        {frequencies.map((bil, bilIndex) => {

                            return (

                                <option key={bilIndex}>

                                    {bil}

                                </option>

                            )

                        })}

                    </select>

                </label>

                <label>

                    <span>Método de pago</span>

                    <select value={formData.paymentMethod} onChange={handleChangeInput} name="paymentMethod">

                        {methods.map((pay, payIndex) => {

                            return (

                                <option key={payIndex}>

                                    {pay}

                                </option>

                            )

                        })}

                    </select>

                </label>

                <label>

                    <span>Fecha de subscripción</span>
                    <input value={formData.startDate} onChange={handleChangeInput} type="date" name="startDate" required/>

                </label>

                <label>

                    <span>Estado</span>

                    <select value={formData.status} onChange={handleChangeInput} name="status">

                        {statuses.map((sta, staIndex) => {

                            return (

                                <option key={staIndex}>

                                    {sta}

                                </option>

                            )

                        })}

                    </select>

                </label>

                <label className="fat-column">

                    <span>Notas</span>
                    <textarea value={formData.notes} onChange={handleChangeInput} name="notes" placeholder="Ej: Incluye Prime Video"/>

                </label>

                <div className="fat-column form-submit-btn">

                    <button onClick={closeInput}>Cancelar</button>
                    <button type="submit">Agregar subscripción</button>

                </div>

            </form>

        </section>

    )

}