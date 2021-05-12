import React, { Component, Fragment } from 'react'
import NavBar from '../../NavBar/NavBar'
import { Redirect } from 'react-router-dom'
import Quagga from 'quagga'
import './scan.css'
import { Modal, Button } from 'react-bootstrap'
import { DataContext } from '../../../stores/Context'
import { getProductsByIdScan } from '../../../services/Api/Product/get'

export class Scanner extends Component {
    static contextType = DataContext;


    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
        this.state = {
            nocamera: false,
            test: [],
            auth: "",
            error: false,
            show: false,
            result: [],
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
            /*this.state.products.map(produits => {
                if (produits.id_product == res.codeResult.code) {
                    this.setState({ result: res.codeResult.code })
                    this.handleShow()
                }
            })*/
            getProductsByIdScan(res.codeResult.code).then(({ data, success, errors }) => {
                if (success === true) {
                    this.setState({ result: data })
                    console.log(this.state.result)
                    //setLoading(true)
                    this.handleShow()
                }
            })
        }
        //Quagga.offProcessed()
        //Quagga.stop()
    }

    getInfos() {
        const product = this.state.result
        const { addCart } = this.context;

        /* eslint eqeqeq: 0 */
        return (
            <div>
                <div>
                    <img src={product.image} width={200} alt="logo" />
                </div>
                <div className="mx-5 my-5">
                    <p> Name:  {product.name}</p>
                    <p> Size:  {product.size}</p>
                    <p> Expiration date :  {product.expiration_Date}</p>
                    <Button variant="success" onClick={() => addCart(product)}>
                        Add
                    </Button>
                </div>
                <div>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Continue shopping
                            </Button>
                        <Button variant="danger" onClick={this.handleClose}>
                            See cart
                            </Button>
                    </Modal.Footer>
                    {/*<div className="input-group mb-3">
                        <span className="input-group-text">Quantité</span>
                        <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
                    </div>*/}
                </div>
            </div>
        )
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
                        <Modal size="lg" ref={this.wrapper} show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title> Product you scanned </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {this.getInfos()}
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            )
        }
    }
}

export default Scanner

