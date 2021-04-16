import React, { Component, Fragment } from 'react'
import NavBar from '../NavBar/NavBar'
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { Redirect } from 'react-router-dom'
import Quagga from 'quagga'
import './scan.css'


class Scanner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nocamera: false,
            test: []
        }
        this.onDetect = this.onDetect.bind(this)
    }

    componentDidMount() {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                constraints: {
                    width: '790',
                    height: '490'
                },
                numberOfWorkers: navigator.hardwareConcurrency,
                target: document.querySelector('#barcodeScan')
            },
            locate: true,
            decoder: {
                readers: ["code_128_reader", "upc_reader", "upc_e_reader"]
            }
        }, function (err) {
            if (err) {
                console.log(err)
                return
            }
            console.log("initialization finished. Ready to start")
            Quagga.start()
        })
        Quagga.onDetected(this.onDetect)
    }

    onDetect(res) {
        console.log(res.codeResult.code)
        alert(res.codeResult.code)
        //this.setState({ test: [...res.codeResult.code] })
        //Quagga.stop()
        //Quagga.offProcessed()
        //this.props.onBarcodeDetect(res.codeResult.code)
    }

    render() {
        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <Fragment>
                    <div id="barcodeScan">
                        {this.state.test}
                    </div>
                </Fragment>
            </div>
        )
    }
}

export default Scanner


/*function Scan() {

    useEffect(() => {
        authenticated()
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                constraints: {
                    width: '790',
                    height: '490'
                },
                numberOfWorkers: navigator.hardwareConcurrency,
                target: document.querySelector('#barcodeScan')
            },
            locate: true,
            decoder: {
                readers: ["code_128_reader", "upc_reader", "upc_e_reader"]
            }
        }, function (err) {
            if (err) {
                console.log(err)
                return
            }
            console.log("initialization finished. Ready to start")
            Quagga.start()
        })
        Quagga.onDetected(onDetect())
    }, [])

    const onDetect = (res)  => {
        console.log(res.codeResult.code)
        alert(res.codeResult.code)
        //this.setState({ test: [...res.codeResult.code] })
        //Quagga.stop()
        //Quagga.offProcessed()
        //this.props.onBarcodeDetect(res.codeResult.code)
    }


    const [auth, setAuth] = useState("")
    const [error, setError] = useState(false)
    const [data, setData] = useState("");
    const [camera, setCamera] = useState(false)

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

export default Scan*/
