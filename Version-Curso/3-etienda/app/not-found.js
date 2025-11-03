import Link from "next/link";

export default function NotFound() {

    return (

        <div className="page-container">

            <h2>Página no encontrada :C</h2>
            <p className="text-large">404</p>

            <Link href="/">
            
                <button>Inicio</button>
            
            </Link>

        </div>

    )

}