import React, { useState } from 'react'
import NavBar from '../NavBar/NavBar'
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

function Scan() {

    const [data, setData] = useState("");


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
                    if (result) setData(result.text)
                    else setData('Not Found')
                }}
            />
            <p>{data}</p>
        </div>
    )
}

export default Scan
