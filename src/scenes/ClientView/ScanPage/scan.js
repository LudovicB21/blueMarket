import React, { Component, Fragment } from 'react'
import NavBar from '../../NavBar/NavBar'
import { Redirect } from 'react-router-dom'
import Quagga from 'quagga'
import './scan.css'
import { Modal, Button } from 'react-bootstrap'
import { DataContext } from '../../../stores/Context'
import { getProductsByIdScan } from '../../../services/Api/Product/get'
import moment from 'moment'
import promotion from '../../../stores/promotion'
import *  as FaIcons from 'react-icons/fa'
import { Link } from 'react-router-dom';

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
                <div className="mx-5 my-5">
                    <img src={product.image} width="200px" style={{ marginLeft: "auto", marginRight: "auto", display: "flex", objectFit: "cover" }} height="250px" alt={product.name} />
                    <div className="row">
                        <div className="col-sm form-group">
                            <label htmlFor="email">Name :</label>
                            <p className="form-control"> {product.name}</p>
                            <a> {product.carbonfootprint <= 1000 ? <div> <FaIcons.FaLeaf /> <FaIcons.FaLeaf /> <FaIcons.FaLeaf /> </div> :
                                product.carbonfootprint > 1000 && product.carbonfootprint <= 2000 ? <div> <FaIcons.FaLeaf /> <FaIcons.FaLeaf /> </div> :
                                    product.carbonfootprint > 2000 && product.carbonfootprint <= 3000 ? <div> <FaIcons.FaLeaf />  </div> : null}</a>
                        </div>
                        {product.promotion === 0 ? null : <div className="col-sm form-group">
                            <label htmlFor="email">Promotion :</label>
                            <p className="form-control"> {(promotion || []).map(promo => {
                                if (promo.id === product.promotion) {
                                    return promo.label
                                } else {
                                    return null
                                }
                            })}</p>
                        </div>}
                    </div>
                    <div className="row">
                        <div className="col-sm form-group">
                            <label htmlFor="address">Price :</label>
                            <p className="form-control"> {product.price} €</p>
                        </div>
                        <div className="col-sm form-group">
                            <label htmlFor="type">Size :</label>
                            <p className="form-control"> {product.size} L</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm form-group">
                            <label htmlFor="type">Expiration Date :</label>
                            <p className="form-control"> {moment(product.expiration_Date).format('DD-MM-YYYY')} </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm form-group">
                            <label htmlFor="type">Ingredients :</label>
                            <p className="form-control"> {product.Ingredients}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => addCart(product)}>
                            Add
                    </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Continue shopping
                        </Button>
                        <Link style={{ textDecoration: "none" }} to={{ pathname: "/shoppingCart" }}>
                            <Button variant="danger" onClick={this.handleClose}>
                                shoppingCart
                            </Button>
                        </Link>
                    </Modal.Footer>
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

