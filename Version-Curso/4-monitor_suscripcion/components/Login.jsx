"use client"

import { useAuth } from "@/context/AuthContext"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function Login() {

    const params = useSearchParams()
    const isReg = params.get("register")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isRegistration, setIsRegistration] = useState(isReg)
    const [error, setError] = useState(null)
    const [authenticating, setAuthenticating] = useState(false)

    const {signUp, login} = useAuth()

    async function handleAuthenticate() {

        if(!email || !email.includes("@") || password.length < 6 || authenticating) { return }

        setError(null)
        setAuthenticating(true)

        try {

            if(isRegistration) {

                await signUp(email, password)

            } else {

                await login(email, password)

            }

        } catch(err) {

            console.log(err.messsage)
            setError(err.messsage)

        } finally {

            setAuthenticating(false)

        }

    }

    return (

        <div className="login">

            <h2>
                {isRegistration ?
                    "Crear cuenta" :
                    "Iniciar Sesión"
                }
            </h2>

            {error && (

                <div> 
                    
                    <p><strong>Error:</strong>{error}</p>

                </div>

            )}

            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email"/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" type="password"/>
            
            <button onClick={handleAuthenticate} disabled={authenticating}>

                {authenticating ? "Ingresando..." : "Ingresar"}

            </button>

            <div className="full-line"/>

            <div>

                <p>

                    {isRegistration ?
                        "¿Ya tienes unas cuenta?" :
                        "¿No tienes una cuentas?"
                    }

                </p>

                <button onClick={() => {

                    setIsRegistration(!isRegistration)

                }}>
                
                    {isRegistration ?
                        "Iniciar Sesión" :
                        "Registrarse"
                    }
                     
                </button>

            </div>

        </div>

    )

}