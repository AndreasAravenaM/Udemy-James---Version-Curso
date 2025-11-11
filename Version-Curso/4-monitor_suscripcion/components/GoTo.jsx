"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function GoTo() {

    const isAuthenticated = false
    const path = usePathname()

    return (

        <div className="goto">

            {path == "/" && (

                <>
                
                    <Link  href={"/dashboard?register=true"}>
                    
                        <p>Registrarse</p>
                    
                    </Link>

                    <Link href={"/dashboard"}>
                    
                        <button>Ingresar</button>

                    </Link>
                
                </>

            )}

            {(isAuthenticated) && path == "/dashboard" && (

                <button>Cerrar Sesión</button>

            )}

        </div>

    )

}