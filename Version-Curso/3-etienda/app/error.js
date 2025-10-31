"use client"

import { useEffect } from "react"
import Link from "next/link";

export default function Error(props) {

    const {error, reset} = props

    useEffect(() => {

        console.log(error)

    }, [error])

    return (

        <div>

            <h3>Ha ocurrido un error :C</h3>

            <button onClick={reset}>Reiniciar</button>

            <Link href="/">
            
                <button>Inicio</button>
            
            </Link>
            
        </div>

    )

}