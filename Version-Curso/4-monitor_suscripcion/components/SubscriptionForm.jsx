"use client"

export default function SubscriptionForm() {

    const categories = ["Entretenimiento", "Música", "Software", "Servicios Web", "Salud y Deporte", "Otro"]
    const currencies = ['USD', 'EUR', 'GBP', 'NZD', "AUD", 'Otro']
    const frequencies = ['Mensualmente', 'Anualmente', 'Trimestralmente', 'Único']
    const methods = ['Tarjeta de Crédito', 'Tarjeta de Débito', 'Paypal', 'Transferencia', "Otro"]
    const statuses = ["Activo", "Pausado", "Cancelado"]

    return (

        <section>

            <h2>Agrega una nueva subscripción</h2>

            <form onSubmit={() => {}}>

                <label>

                    <span>Nombre subscripción</span>
                    <input type="text" placeholder="Ej: Nexflix" required/>

                </label>

                <label>

                    <span>Categoría</span>

                    <select name="category">

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
                    <input type="number" name="cost" step="0.01" placeholder="12.00" required/>

                </label>

                <label>

                        <span>Moneda</span>

                        <select name="currency">

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

                    <select name="billingFrequency">

                        {frequencies.map((bil, bilIndex) => {

                            <option key={bilIndex}>

                                {bil}

                            </option>

                        })}

                    </select>

                </label>

                <label>

                    <span>Método de pago</span>

                    <select name="paymentMethod">

                        {methods.map((pay, payIndex) => {

                            <option key={payIndex}>

                                {pay}

                            </option>

                        })}

                    </select>

                </label>

                <label>

                    <span>Fecha de subscripción</span>
                    <input type="date" name="startDate" required/>

                </label>

                <label>

                    <span>Estado</span>

                    <select name="status">

                        {statuses.map((sta, staIndex) => {

                            <option key={staIndex}>

                                {sta}

                            </option>

                        })}

                    </select>

                </label>

                <label className="fat-column">

                    <span>Notas</span>
                    <textarea name="notes" placeholder="Ej: Incluye Prime Video"/>

                </label>

                <div className="fat-column form-submit-btn">

                    <button>Cancelar</button>
                    <button>Agregar subscripción</button>

                </div>

            </form>

        </section>

    )

}