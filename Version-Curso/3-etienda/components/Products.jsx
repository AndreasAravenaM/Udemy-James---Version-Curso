"use client"

import { useState } from "react"
import Portal from "./Portal"

export default function Products() {

    const [portalImage, setPortalImage] = useState(null)

    const stickerDescriptions = {

        CSS_HTML_Javascript: "Tecnologías web base para la estructura, el estilo y la interactividad. Todo desarrollador debe de iniciar en éstas tecnologías si quieren aprender frontend",
        Docker: "Plataforma para contenerizar, implementar y escalar aplicaciones.",
        Firebase: "Plataforma en la nube para bases de datos, autenticación y backend de aplicaciones.",
        NextJS: "Framework basado en React para renderización del lado del servidor y sitios estáticos.",
        NodeJS: "Entorno de ejecución de JavaScript para crear aplicaciones de backend escalables.",
        PostgreSQL: "Base de datos robusta de código abierto con capacidades avanzadas de consulta.",
        ReactJS: "Biblioteca Javascript para crear interfaces de usuario interactivas."

    }

    const stickers = Object.keys(stickerDescriptions)

    return (

        <>

            {portalImage && (

                <Portal handleClosePortal={() => { setPortalImage(null) }}>

                    <div className="portal-content">

                        <img className="img-display" src={`med_res/${portalImage}.jpeg`} alt={`${portalImage}-high-res`}/>

                    </div>

                </Portal>

            )}

            <div className="section-container">

                <div className="section-header">

                    <h2>Compra de nuestra selección</h2>
                    <p>Para organizar o accesorar</p>

                </div>

                <div className="planner-container">

                    <div>

                        <button className="img-button" onClick={() => {
                            
                            setPortalImage("planner")
                            
                            }}>
                        
                            <img src="low_res/planner.jpeg" alt="low_res_planner" />

                        </button>

                    </div>

                    <div className="planner-info">

                        <p className="text-large planner-header">

                            Calendario "Dragon Medieval"

                        </p>
                        <h3><span>$</span>10.000</h3>

                        <p>¡Adéntrate en un mundo de fantasía y organización con nuestro planificador mensual medieval con 
                            dragones! Este recurso PNG de alta resolución combina la feroz elegancia de los dragones con 
                            intrincados diseños medievales para crear un planificador que no solo es funcional, sino también
                            una obra de arte. Ya sea que estés anotando misiones, planeando batallas o simplemente 
                            programando tu compra semanal, este planificador es tu mejor compañero.
                        </p>

                        <ul>

                            <li><strong>Ilustraciones épicas de dragones:</strong> impresionantes motivos de dragones 
                                dibujados a mano y bordes de inspiración medieval hacen que cada mes sea legendario.
                            </li>

                            <li><strong>Totalmente imprimible:</strong> Diseñado con una resolución ultraalta, es perfecto
                                para imprimir en papel de cualquier tamaño, desde A4 hasta carteles.
                            </li>

                        </ul>
                        
                        <div className="purchase-btns">

                            <button>Agregar al carro</button>

                        </div>

                    </div>

                </div>

            </div>

            <div className="section-container">

                <div className="section-header">

                    <h2>O colecciona tus tecnologías favoritas</h2>
                    <p>Elige entre nuestros logos personalizados de tecnologías</p>

                </div>

                <div className="sticker-container">

                    {stickers.map((sticker, stickerIndex) => {

                        return (

                            <div key={stickerIndex} className="sticker-card">

                                <button className="img-button" onClick={() => {
                                    
                                        setPortalImage(sticker)
                                        
                                    }}>

                                    <img src={`low_res/${sticker}.jpeg`} alt={`${sticker}-low-res`}/>

                                </button>

                                <div className="sticker-info">

                                    <div className="sticker-details">

                                        <div className="sticker-title"> 

                                            <p className="text-medium">

                                                {sticker.replaceAll("_", " ")} Sticker.png

                                            </p>

                                        </div>

                                        <p>{stickerDescriptions[sticker]}</p>

                                    </div>
                    
                                    <h4><span>$</span>4.000</h4>

                                    <div className="purchase-btns">

                                        <button>Agregar al carro</button>

                                    </div>

                                </div>

                            </div>
                        

                        )

                    })}

                </div>

            </div>

        </>

    )

}