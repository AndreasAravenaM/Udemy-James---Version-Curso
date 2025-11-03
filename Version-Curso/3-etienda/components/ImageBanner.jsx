"use client"

import { useState, useRef, useEffect } from "react"

export default function ImageBanner() {

    const [isLoaded, setIsLoaded] = useState(false)
    const imgRef = useRef()

    useEffect(() => {

        if(imgRef.current.complete) {

            setIsLoaded(true)

        }

    }, [])

    return (

        <div className="banner-images">

            <img className="low-res-img" src="low_res/banner.jpeg" alt="banner-low-res" />
            <img className="high-res-img" src="med_res/banner.png" alt="banner-high-res" ref={imgRef} 
                style={{opacity: isLoaded ? 1 : 0}} onLoad={() => {

                    setIsLoaded(true)
                
            }} />

            <div className="cta-btns-container">

                <div>

                    <div>

                        <h3>Bienvenidos a</h3>
                        <h1>La Pequeña Tienda</h1>

                    </div>

                    <div>

                        <button>Comprar stickers</button>
                        <button>Comprar calendario</button>

                    </div>

                </div>

            </div>

        </div>

    )

}