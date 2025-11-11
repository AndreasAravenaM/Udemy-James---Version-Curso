import Login from "@/components/Login"
import SuscriptionsDisplay from "@/components/SuscriptionsDisplay"
import SuscriptionSummary from "@/components/SuscriptionSummary"

export default function DashboardPage() {

    const isAuthenticated = false

    if(!isAuthenticated) {

        return (

            <Login />

        )

    }

    return (

        <>

            <SuscriptionSummary />
            <SuscriptionsDisplay />

        </>

    )

}