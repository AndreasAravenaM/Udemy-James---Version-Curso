export default function Layout(props) {

    const {children} = props

    const header = (

        <header>

            <h1 className="text-gradient">El Brograma</h1>
            <p><strong>El programa de 30 simples ejercicios</strong></p>

        </header>

    )

    const footer = (

        <footer>

            <p>Construido durante la clase con
                <a href="https://www.smoljames.com" target="_blank"> Smoljames</a>
                <br />Estilizado con <a href="https://www.fantacss.smoljames.com" target="_blank">FantaCSS</a></p>

        </footer>

    )

    return (

        <>
        
            {header}
            {children}
            {footer}

        </>

    )

}