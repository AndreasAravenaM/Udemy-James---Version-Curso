import "./globals.css";
import "./fanta.css";
import Head from "./head";
import Link from "next/link";
import Cart from "@/components/Cart"
import EmailInput from "@/components/EmailInput";

export const metadata = {
  title: "Pequeña Tienda",
  description: "Aprendiendo como hacer una tienda funcional con James",
};

export default function RootLayout({ children }) {

  const header = (

    <header>

      <div className="header-content">

        <Link href="/">
        
          <h1> Pequeña Tienda</h1>
        
        </Link>

        <h5 className="mid-text">-Una tienda para quienes quieren aprender-</h5>
        <Cart />

      </div>

    </header>

  )

  const footer = (

    <footer>

      <div className="email-container">

        <h5> Si fuera real, podrías recibir ofertas especiales al suscribirte.</h5>

        <EmailInput />

      </div>

      <div className="links-container">

        <div>

          <h3>Tienda</h3>
          <Link href="/">Inicio</Link>
          <Link href="/cart">Carrito</Link>

        </div>

        <div>

          <h3>Soporte</h3>
          <Link href="/contact">Contacto</Link>
          <Link href="/faqs">Preguntas</Link>

        </div>

      </div>

      <div className="socials">

        <p>Construido durante la clase con
          <a href="https://www.smoljames.com" target="_blank"> Smoljames</a>
          <br />Estilizado con <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a></p>

        <div className="social-links">

          <Link href="https://www.linkedin.com/in/andreas-aravena-maldonado/" target="_blank">
          
            <i className="fa-brands fa-linkedin"></i>

          </Link>
          <Link href="https://github.com/AndreasAravenaM" target="_blank" >
          
            <i className="fa-brands fa-github"></i>
          
          </Link>

        </div>

      </div>

    </footer>

  )

  return (

    <html lang="en">

      <Head />

      <body>

        <div id="portal" />
        <div id="app">

          {header}

          <main>

            {children}

          </main>

          <div className="hr" />

          {footer}

        </div>

      </body>
    </html>
  );
}
