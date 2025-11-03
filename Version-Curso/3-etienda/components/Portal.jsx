import ReactDom from "react-dom"

export default function Portal(props) {

    const {children, handleClosePortal} = props

    return ReactDom.createPortal (

        <div className="portal-container">

            <div className="portal-underlay" onClick={handleClosePortal}/>
            {children}

        </div>,

        document.getElementById("portal")

    )

}