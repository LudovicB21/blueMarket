import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { Redirect } from 'react-router-dom'
function Scan() {

    useEffect(() => {
        authenticated()
    }, [])

    const [auth, setAuth] = useState("")
    const [error, setError] = useState(false)
    const [data, setData] = useState("");

    const authenticated = () => {
        if (localStorage.getItem('user')) {
            setAuth(JSON.parse(localStorage.getItem('user')))
        } else {
            setError(true)
        }
    }

    if (error === true) {
        return <Redirect to="/login" />
    } else {
        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <BarcodeScannerComponent
                    width={500}
                    height={500}
                    onUpdate={(err, result) => {
                        console.log(err)
                        if (result) {
                            alert(result)
                            //setData(result.text)
                        }
                        else setData('Not Found')
                    }}
                />
                <p>{data}</p>
            </div>
        )
    }
}

export default Scan
