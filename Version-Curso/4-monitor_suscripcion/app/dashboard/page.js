"use client"

import Login from "@/components/Login"
import SubscriptionForm from "@/components/SubscriptionForm"
import SubscriptionsDisplay from "@/components/SubscriptionsDisplay"
import SubscriptionSummary from "@/components/SubscriptionSummary"
import { useAuth } from "@/context/AuthContext"
import { Suspense, useState } from "react"

const blankSubscription = {

        name: "",
        category: "Entretenimiento",
        cost: "",
        currency: "USD",
        billingFrequency: "Mensualmente",
        nextBillingDate: "",
        paymentMethod: "Tarjeta de Crédito",
        startDate: "",
        renewalType: "",
        notes: "",
        status: "Activo",

    }

export default function DashboardPage() {

    const [isAddEntry, setIsAddEntry] = useState(false)
    const {handleDeleteSubscription, userData, currentUser, loading} = useAuth()
    const isAuthenticated = !!currentUser

    const [formData, setFormData] = useState(blankSubscription)

    function handleChangeInput(e) {

        const newData = {
            ...formData,
            [e.target.name]: e.target.value
        }

        setFormData(newData)

    }

    function handleEditSubscription(index) {

        const data = userData.subscriptions.find((val, valIndex) => {

            return valIndex === index

        })

        

        setFormData(data)
        handleDeleteSubscription(index)
        setIsAddEntry(true)

    }

    function handleResetForm() {

        setFormData(blankSubscription)

    }

    function handleToogleInput() {

        setIsAddEntry(!isAddEntry)

    }

    if(loading) {

        return (

            <p>Cargando...</p>

        )

    }

    if(!isAuthenticated) {

        return (

            <Suspense fallback={<p>Cargando...</p>}>

                <Login />

            </Suspense>
            
        )

    }

    return (

        <>

            <SubscriptionSummary />
            <SubscriptionsDisplay handleEditSubscription={handleEditSubscription} handleShowInput={
                
                isAddEntry ?
                () => {} :
                handleToogleInput

            }/>

            {isAddEntry && (

                <SubscriptionForm handleResetForm={handleResetForm} closeInput={handleToogleInput} 
                    formData={formData} handleChangeInput={handleChangeInput} />
            
            )}

        </>

    )

}