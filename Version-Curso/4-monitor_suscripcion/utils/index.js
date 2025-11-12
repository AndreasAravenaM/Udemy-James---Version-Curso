export const calculateSubscriptionMetrics = (subscriptions) => {
    // Filter active subscriptions
    const subscripciones_activas = subscriptions.filter(sub => sub.status === "Activo");

    // Initialize metrics
    let costo_mensual_total = 0;
    let costo_anual_total = 0;
    let category_spending = {};
    let cuentas_por_pagar = 0;
    let subscripción_más_cara = null;

    const today = new Date();
    const next_week = new Date();
    next_week.setDate(today.getDate() + 7);

    subscripciones_activas.forEach(sub => {
        // Ensure numeric values are properly parsed
        const cost = parseFloat(sub.cost) || 0;
        const billingFrequency = sub.billingFrequency;

        const monthly_cost = billingFrequency === "Anualmente" ? cost / 12 : cost;
        costo_mensual_total += monthly_cost;
        costo_anual_total += billingFrequency === "Anualmente" ? cost : cost * 12;

        // Track category spending
        if (!category_spending[sub.category]) {
            category_spending[sub.category] = 0;
        }
        category_spending[sub.category] += cost;

        // Determine most expensive subscription
        if (!subscripción_más_cara || cost > subscripción_más_cara.cost) {
            subscripción_más_cara = sub;
        }

        // Calculate next billing date
        const start_date = new Date(sub.startDate);
        let next_billing_date = new Date(start_date);
        while (next_billing_date < today) {
            if (billingFrequency === "Mensualmente") {
                next_billing_date.setMonth(next_billing_date.getMonth() + 1);
            } else if (billingFrequency === "Anualmente") {
                next_billing_date.setFullYear(next_billing_date.getFullYear() + 1);
            }
        }

        // Count upcoming billing within the next 7 days
        if (next_billing_date >= today && next_billing_date <= next_week) {
            cuentas_por_pagar++;
        }
    });

    // Calculate average monthly spending
    const gasto_mensual_promedio = subscripciones_activas.length > 0 ? costo_mensual_total / subscripciones_activas.length : 0;

    // Find the top spending category
    let categoría_de_mayor_costo = Object.entries(category_spending).reduce((top, current) => current[1] > top[1] ? current : top, ["", 0])[0] || "None";

    return {
        costo_mensual_total: costo_mensual_total.toFixed(2),
        costo_anual_total: costo_anual_total.toFixed(2),
        gasto_mensual_promedio: gasto_mensual_promedio.toFixed(2),
        subscripciones_activas: subscripciones_activas.length,
        categoría_de_mayor_costo,
        cuentas_por_pagar,
        subscripción_más_cara: subscripción_más_cara ? subscripción_más_cara.name : "Ninguno"
    };
};


// export const calculateSubscriptionMetrics = (subscriptions) => {
//     // Filter active subscriptions
//     const subscripciones_activas = subscriptions.filter(sub => sub.status === "Active")

//     // Calculate total monthly and yearly costs
//     let costo_mensual_total = 0
//     let costo_anual_total = 0
//     let category_spending = {}
//     let cuentas_por_pagar = 0
//     let subscripción_más_cara = null

//     const today = new Date()
//     const next_week = new Date()
//     next_week.setDate(today.getDate() + 7)

//     subscripciones_activas.forEach(sub => {
//         const monthly_cost = sub.billingFrequency === "Yearly" ? sub.cost / 12 : sub.cost
//         costo_mensual_total += monthly_cost
//         costo_anual_total += sub.billingFrequency === "Yearly" ? sub.cost : sub.cost * 12

//         // Track category spending
//         if (!category_spending[sub.category]) {
//             category_spending[sub.category] = 0
//         }
//         category_spending[sub.category] += sub.cost

//         // Determine most expensive subscription
//         if (!subscripción_más_cara || sub.cost > subscripción_más_cara.cost) {
//             subscripción_más_cara = sub
//         }

//         // Calculate next billing date
//         const start_date = new Date(sub.startDate)
//         let next_billing_date = new Date(start_date)
//         while (next_billing_date < today) {
//             if (sub.billingFrequency === "Monthly") {
//                 next_billing_date.setMonth(next_billing_date.getMonth() + 1)
//             } else if (sub.billingFrequency === "Yearly") {
//                 next_billing_date.setFullYear(next_billing_date.getFullYear() + 1)
//             }
//         }

//         // Count upcoming billing within the next 7 days
//         if (next_billing_date >= today && next_billing_date <= next_week) {
//             cuentas_por_pagar++
//         }
//     })

//     // Calculate average monthly spending
//     const gasto_mensual_promedio = subscripciones_activas.length > 0 ? costo_mensual_total / subscripciones_activas.length : 0

//     // Find the top spending category
//     let categoría_de_mayor_costo = Object.entries(category_spending).reduce((top, current) => current[1] > top[1] ? current : top, ["", 0])[0] || "None"

//     return {
//         costo_mensual_total: costo_mensual_total.toFixed(2),
//         costo_anual_total: costo_anual_total.toFixed(2),
//         gasto_mensual_promedio: gasto_mensual_promedio.toFixed(2),
//         subscripciones_activas: subscripciones_activas.length,
//         categoría_de_mayor_costo,
//         cuentas_por_pagar,
//         subscripción_más_cara: subscripción_más_cara ? subscripción_más_cara.name : "None"
//     }
// }

// Example usage
// console.log(calculateSubscriptionMetrics(subscriptions))


// Helper function to format object keys into readable labels
export const formatKey = (key) => {
    return key
        .replace(/([A-Z])/g, " $1") // Add space before capital letters
        .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
        .replace("Fechas de cuentas a pagar", "Cuentas a pagar (en 7 días)")
        .replace("Prueba termina pronto", "Pruebas terminan pronto")
}

export function getDaysUntilNextCharge(startDate, billingFrequency) {
    const start = new Date(startDate)
    const today = new Date()

    let nextBillingDate = new Date(start)

    if (billingFrequency === "Mensualmente") {
        // Add months until next charge is in the future
        while (nextBillingDate <= today) {
            nextBillingDate.setMonth(nextBillingDate.getMonth() + 1)
        }
    } else if (billingFrequency === "Anualmente") {
        // Add years until next charge is in the future
        while (nextBillingDate <= today) {
            nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1)
        }
    } else if (billingFrequency === "Trimestralmente") {
        // Add quarters (3 months)
        while (nextBillingDate <= today) {
            nextBillingDate.setMonth(nextBillingDate.getMonth() + 3)
        }
    } else if (billingFrequency === "Único") {
        // No recurring charges
        return "No upcoming charges"
    }

    // Calculate the number of days until next charge
    const diffTime = nextBillingDate - today
    const daysUntilNextCharge = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return daysUntilNextCharge
}

// Example Usage
// console.log(getDaysUntilNextCharge("2024-02-01", "Monthly"))  // Example output: 30


export const subscriptions = [
    {
        id: 1,
        name: "Netflix",
        category: "Entretenimiento",
        cost: 15.99, // Monthly cost in USD
        currency: "USD",
        billingFrequency: "Mensualmente", // Could be "Monthly", "Yearly", etc.
        paymentMethod: "Tarjeta de Crédito", // e.g., Credit Card, PayPal, etc.
        startDate: "2022-06-15", // Subscription start date
        renewalType: "Automatic", // Could be "Automatic" or "Manual"
        notes: "Compartido con la familia",
        status: "Activo", // Could be "Active", "Paused", or "Canceled"
    },
    {
        id: 2,
        name: "Spotify",
        category: "Música",
        cost: 9.99,
        currency: "USD",
        billingFrequency: "Mensualmente",
        paymentMethod: "PayPal",
        startDate: "2021-11-01",
        renewalType: "Automatic",
        notes: "Descuento aplicado a estudiantes",
        status: "Activo",
    },
    {
        id: 3,
        name: "Amazon Prime",
        category: "Shopping",
        cost: 139.00,
        currency: "USD",
        billingFrequency: "Anualmente",
        paymentMethod: "Tarjeta de Crédito",
        startDate: "2019-12-01",
        renewalType: "Automatic",
        notes: "Incluye Prime Video",
        status: "Activo",
    },
    {
        id: 4,
        name: "Adobe Creative Cloud",
        category: "Software",
        cost: 54.99,
        currency: "USD",
        billingFrequency: "Mensualmente",
        paymentMethod: "Tarjeta de Crédito",
        startDate: "2023-03-01",
        renewalType: "Manual",
        notes: "Usado para edición de vídeos y diseño",
        status: "Activo",
    },
    {
        id: 5,
        name: "Membresía de gimnasio",
        category: "Salud y Deporte",
        cost: 50.00,
        currency: "USD",
        billingFrequency: "Mensualmente",
        paymentMethod: "Tarjeta de Débito",
        startDate: "2020-01-15",
        renewalType: "Automatic",
        notes: "Accede a múltiples sedes",
        status: "Pausado",
    },
    {
        id: 6,
        name: "Hosting de dominio (GoDaddy)",
        category: "Servicios Web",
        cost: 12.00,
        currency: "USD",
        billingFrequency: "Anualmente",
        paymentMethod: "Tarjeta de Crédito",
        startDate: "2021-08-20",
        renewalType: "Automatic",
        notes: "Usado como blog personal",
        status: "Activo",
    },
]