"use client"

import { useState } from "react"
import Portal from "./Portal"
import { useProducts } from "@/context/ProductContext"

export default function Products(props) {

    const {planner, stickers} = props
    const [portalImage, setPortalImage] = useState(null)
    const {handleIncrementProduct, cart} = useProducts()

    if(!planner || !stickers.length) { return null}

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

                            <button onClick={() => {

                                const plannerPriceId = planner.default_price
                                handleIncrementProduct(plannerPriceId, 1, planner)

                            }}>Agregar al carro</button>

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

                        const stickerName = sticker.name
                        const stickerImgURL = stickerName.replaceAll(" Sticker.jpeg", "").replaceAll(" ", "_")
                        const stickerDescription = sticker.description
                        const stickerPrice = (sticker.prices[0].unit_amount)/100

                        return (

                            <div key={stickerIndex} className="sticker-card">

                                <button className="img-button" onClick={() => {
                                    
                                        setPortalImage(stickerImgURL)
                                        
                                    }}>

                                    <img src={`low_res/${stickerImgURL}.jpeg`} alt={`${stickerImgURL}-low-res`}/>

                                </button>

                                <div className="sticker-info">

                                    <div className="sticker-details">

                                        <div className="sticker-title"> 

                                            <p className="text-medium">

                                                {stickerName}

                                            </p>

                                        </div>

                                        <p>{stickerDescription}</p>

                                    </div>
                    
                                    <h4><span>$</span>{stickerPrice}</h4>

                                    <div className="purchase-btns">

                                        <button onClick={() => {

                                        const stickerPriceId = sticker.default_price
                                        handleIncrementProduct(stickerPriceId, 1, sticker)

                                    }}>Agregar al carro</button>

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