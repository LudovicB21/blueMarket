import React, { Component, Fragment } from 'react'
import NavBar from '../NavBar/NavBar'
import { Redirect } from 'react-router-dom'
import Quagga from 'quagga'
import './scan.css'
import { Modal, Button } from 'react-bootstrap'


class Scanner extends Component {

    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
        this.state = {
            nocamera: false,
            test: [],
            auth: "",
            error: false,
            show: false,
            result: "",
            products: [
                {
                    id: 1,
                    id_product: 555444332221,
                    name: "pâtes1",
                    size: "0",
                    image: "../assets/img/barilla-rigatoni.jpg",
                    ingredient1: "ingrédient 1",
                    ingredient2: "ingrédient 2",
                    ingredient3: "ingrédient 3",
                    ingredient4: "ingrédient 4",
                    ingredient5: "ingrédient 5",
                    livraison: "2021/04/17",
                    expiration: "2021/07/20"
                },
                {
                    id: 2,
                    id_product: 123456789012,
                    name: "pâtes2",
                    size: "0",
                    image: "../assets/img/barilla-rigatoni.jpg",
                    ingredient1: "ingrédient 1",
                    ingredient2: "ingrédient 2",
                    ingredient3: "ingrédient 3",
                    ingredient4: "ingrédient 4",
                    livraison: "2021/05/19",
                    expiration: "2021/07/24"
                },
            ]

        }
        this.onDetect = this.onDetect.bind(this)
    }

    componentDidMount() {
        //this.authenticated()
        if (localStorage.getItem('user')) {
            this.setState({ auth: JSON.parse(localStorage.getItem('user')) })
        } else {
            this.setState({ error: true })
        }
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
        if (res.codeResult.code) {
            /* eslint eqeqeq: 0 */
            /* eslint array-callback-return: 0 */
            this.state.products.map(produits => {
                if (produits.id_product == res.codeResult.code) {
                    this.setState({ result: res.codeResult.code })
                    this.handleShow()
                }
            })
        }
        //Quagga.offProcessed()
        //Quagga.stop()
    }

    //Renvoyer les informations du produits dans la modal 
    /*getInfos() {
        const code = this.state.result
        // Permet de supprimer le warning ce comparaison avec type incorrecte en console ;) Ne pas supprimer
        /* eslint eqeqeq: 0 
        if (code !== "") {
            this.state.products.map(produits => {
                if (produits.id_product == code) {
                    console.log(produits.name)
                    return <p> {produits.name} </p>
                }
                // Retourne une valeur nulle pour eviter un warning
                return null
            })
        }
    }*/

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
                        <Modal size="lg" ref={this.wrapper} show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title> Ajouter votre produit </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {this.state.result || null}
                                {/*this.getInfos()*/}
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

