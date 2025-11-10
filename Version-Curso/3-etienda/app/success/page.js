import Link from "next/link";

export default function SuccessPage() {

    return (

        <div className="page-container">

            <h2 className="text-large">Gracias por tu compra</h2>

            <Link href="/">
            
                <button>Seguir comprando</button>
            
            </Link>

        </div>

    )

}