import "./globals.css";
import "./fanta.css"
import Head from "./Head";
import Link from "next/link";
import GoTo from "@/components/GoTo";


export const metadata = {
  title: "Monitor de subscripciones",
  description: "Monitorea todos los análisis de tus subscripciones",
};

export default function RootLayout({ children }) {

  const header = (

    <header>

      <div>

        <Link href={"/"}>
        
          <h1 className="text-gradient">Monitor</h1>
        
        </Link>

        <p>Monitorea tus subscripciones</p>

      </div>

      <GoTo />

    </header>

  )

  const footer = (

    <footer>

      <div className="hard-line"/>

      <div className="footer-content">

        <div>

          <div>

            <h4>Monitor</h4>
            <p>|</p>
            <button disabled>Instalar app</button>

          </div>

          <p className="copyright">Proyecto siguiendo el curso Fullstack de James McArthur.</p>

        </div>

        <div>

          <p>¿Teniendo problemas? <a>Consigue ayuda aquí</a></p>
          <p>¿Tienes sugerencias? <a>Compartes tus ideas</a></p>
          
        </div>

        <div>

          <Link href="/privacy">Políticas de privacidad</Link>
          <Link href="/tos">Términos de uso</Link>

        </div>

      </div>

    </footer>

  )

  return (
    <html lang="en">
      <Head />
      <body>
        {header}
        <div className="full-line"/>
        <main>
          {children}
        </main>
        {footer}
      </body>
    </html>
  );
}
