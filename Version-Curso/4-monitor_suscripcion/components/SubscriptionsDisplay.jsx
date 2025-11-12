import { getDaysUntilNextCharge, subscriptions } from "@/utils"

export default function SubscriptionsDisplay() {

    return (

        <section>

            <h2>Tus subscripciones</h2>

            <div className="card-container">

                {subscriptions.map((sub, subIndex) => {

                    const { name, category, cost, currency, billingFrequency, startDate, notes, status } = sub
                    const typeStatus = status === "Activo" ? "status card-button-primary" : "status card-button-secondary"

                    return (

                        <div key={subIndex} className="card subscription-card">

                            <div>

                                <h3>{name}</h3>

                                <div className={typeStatus}>

                                    <small>{status}</small>

                                </div>

                            </div>

                            <p><i>{category}</i></p>

                            <div className="sub-cost">

                                <h2>${cost}</h2>
                                <p>{currency}</p>

                            </div>

                            <small>{billingFrequency}</small>

                            <div className="sub-renewal">

                                <div>

                                    <p>Comienza el</p>
                                    <h4>{startDate}</h4>

                                </div>

                                <div>

                                    <p>Vence en</p>
                                    <h4>{getDaysUntilNextCharge(startDate, billingFrequency)} días</h4>

                                </div>

                                <div className="white-line" />
                                <p>{notes}</p>

                                <div className="subscription-actions">

                                    <button className="button-card">

                                        <i className="fa-solid fa-pen-to-square"/>
                                        Editar

                                    </button>

                                    <button className="button-card">

                                        <i className="fa-solid fa-trash"/>
                                        Eliminar 

                                    </button>

                                </div>

                            </div>

                        </div>

                    )

                })}

                <button className="button-card add-subscriptions">

                    <i className="fa-solid fa-plus"/>
                    <h5>Agregar subscripción</h5>

                </button>

            </div>

        </section>

    )

}