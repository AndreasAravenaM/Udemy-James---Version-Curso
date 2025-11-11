export default function Login() {

    return (

        <div className="login">

            <h2>Ingresar</h2>
            <input placeholder="Email" type="email"/>
            <input placeholder="Contraseña" type="password"/>
            <button>Continuar</button>
            <div className="full-line"/>

            <div>

                <p>¿No tienes una cuentas?</p>
                <button>Registrarse</button>

            </div>

        </div>

    )

}