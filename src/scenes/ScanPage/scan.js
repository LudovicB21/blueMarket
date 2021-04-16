import React, { Component, Fragment } from 'react'
import NavBar from '../NavBar/NavBar'
import { Redirect } from 'react-router-dom'
import Quagga from 'quagga'
import './scan.css'
import { Modal, Button } from 'react-bootstrap'


class Scanner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nocamera: false,
            test: [],
            auth: "",
            error: false,
            show: false,
            result: ""
        }
        this.onDetect = this.onDetect.bind(this)
    }

    componentDidMount() {
        this.authenticated()
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

    authenticated = () => {
        if (localStorage.getItem('user')) {
            this.setState({ auth: JSON.parse(localStorage.getItem('user')) })
        } else {
            this.setState({ error: true })
        }
    }

    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });

    onDetect(res) {
        this.handleShow()
        this.setState({ result: res.codeResult.code })
        //alert(res.codeResult.code)
        //this.setState({ test: [...res.codeResult.code] })
        //Quagga.offProcessed()
        //Quagga.stop()
        //this.props.onBarcodeDetect(res.codeResult.code)
    }

    render() {
        if (this.state.error === true) {
            return <Redirect to="/login" />
        } else {
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
                    <div>
                        <button className="btn btn-secondary" data-toggle="modal" data-target="#exampleModalCenter" onClick={this.handleShow}> Change password</button>
                        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title> Ajouter votre produit </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {this.state.result || null}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="success" onClick={this.handleClose}>
                                    Valider et continuer
                                    </Button>
                                <Button variant="primary" onClick={this.handleClose}>
                                    Voir le panier
                                    </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            )
        }
    }
}

export default Scanner

