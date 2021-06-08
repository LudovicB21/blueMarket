import React, { useEffect, useState } from 'react'
import NavBar from '../../NavBar/NavBar'
import { getAllStats, updateStatBefore, getLessProduct } from "../../../services/Api/Statistics/get"
import CircularProgress from '@material-ui/core/CircularProgress';
import { PolarArea, Bar } from 'react-chartjs-2'
import { Link } from 'react-router-dom';

function Stats() {

    const [loading, setLoading] = useState(null)
    const [statistics, setStatistics] = useState([])
    const [error, setError] = useState(null)
    const [lessProduct, setLessProduct] = useState([])
    const [errorsLess, setErrorsLess] = useState(null)
    const [loadingLess, setLoadingLess] = useState(null)

    useEffect(() => {
        setLoading(true)
        loadStats()
    }, [])

    const loadStats = () => {
        loadData()
    }

    const loadData = async () => {
        const { success, errors } = await updateStatBefore()
        if (success === true) {
            getAllStats().then(({ data, success, errors }) => {
                if (success === true) {
                    setStatistics(data)
                    setLoading(false)
                } else {
                    setLoading(false)
                    setError(errors)
                }
            })
        } else {
            setError(errors)
        }

        const { sucess, errorsLess, data } = await getLessProduct()
        if (sucess === true) {
            setLessProduct(data)
            setLoadingLess(false)
        } else {
            setLoading(false)
            setErrorsLess(errorsLess)
        }
    }

    if (statistics !== []) {
        localStorage.setItem("statistics", JSON.stringify(statistics))
        localStorage.setItem("lessProduct", JSON.stringify(lessProduct))
    }

    console.log(statistics)

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="mx-5 my-5">
                <h1 style={{ textAlign: "center" }}> <strong> Statistics </strong></h1>
                {error !== null ? <p style={{ color: "red" }}>{error.GetUserCart}</p> : ""}
                {loading === true ? <CircularProgress />
                    : <div>
                        <div className="row">
                            <h2 style={{ marginLeft: "1%" }}> <strong> Average spend: </strong></h2>
                            <div className="col-sm form-group" style={{ margin: "5px" }}>
                                <h3>{statistics?.MeanCartPrice}€</h3>
                            </div>
                        </div>
                        <div className="row">
                            <h2 style={{ marginLeft: "1%" }}> <strong>Total Cart: </strong> </h2>
                            <div className="col-sm form-group" style={{ margin: "5px" }}>
                                <h3>{statistics?.totalcart}</h3>
                            </div>
                        </div>
                        <div className="row">
                            <h2 style={{ marginLeft: "1%" }}> <strong> Total Customers register :</strong></h2>
                            <div className="col-sm form-group" style={{ margin: "5px" }}>
                                <h3>{statistics?.totalcustomer}</h3>
                            </div>
                        </div>
                        <br></br>
                        <h2> <strong> Advice for moving departments :</strong></h2>
                        <div style={{ margin: "5px" }}>
                            <Link style={{ textDecoration: "none" }} to={{ pathname: "/department" }}>
                                <button className="btn btn-primary"> Go to departments</button>
                            </Link>
                        </div>
                        <div style={{ border: "solid", borderRadius: "5%", borderColor: "gray" }}>
                            <div style={{ margin: "5px", fontSize: "20px" }}>
                                <p>{statistics?.phrasing1}</p>
                                <p>{statistics?.phrasing2}</p>
                            </div>
                        </div>
                        <br></br>
                        <h2><strong> Best product sell :</strong></h2>
                        <div style={{ border: "solid", borderRadius: "3%", borderColor: "gray" }}>
                            {JSON.parse(localStorage.getItem("statistics")).MeanCartProduct ? <PolarArea
                                data={{
                                    labels: Object.keys(statistics.MeanCartProduct),
                                    datasets: [
                                        {
                                            label: '# of votes',
                                            data: Object.values(statistics.MeanCartProduct),
                                            backgroundColor: [
                                                'rgba(255, 99, 132, 0.4)',
                                                'rgba(75, 192, 192, 0.4)',
                                                'rgba(255, 205, 86, 0.4)',
                                                'rgba(201, 203, 207, 0.4)',
                                                'rgba(54, 162, 235, 0.4)',
                                                'rgba(255, 159, 64, 0.4)',
                                                'rgba(255, 99, 132, 4)',
                                            ]
                                        },
                                    ],
                                }}
                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                        yAxes: [
                                            {
                                                ticks: {
                                                    beginAtZero: true,
                                                },
                                            },
                                        ],
                                    },
                                    legend: {
                                        labels: {
                                            fontSize: 25,
                                        },
                                    },
                                }}
                            /> : null}
                        </div>
                        <br></br>
                        <h2> <strong> The least sold products :</strong></h2>
                        {errorsLess !== null ? <p style={{ color: "red" }}>{errorsLess}</p> :
                            <div>
                                <div style={{ margin: "5px" }}>
                                    <Link style={{ textDecoration: "none" }} to={{ pathname: "/department" }}>
                                        <button className="btn btn-primary"> Go to your departments</button>
                                    </Link>
                                </div>
                                <div style={{ border: "solid", borderRadius: "3%", borderColor: "gray" }}>
                                    {JSON.parse(localStorage.getItem("lessProduct")) ? <Bar
                                        data={{
                                            labels: lessProduct.map(product => (product.name)),
                                            datasets: [
                                                {
                                                    label: 'number of times the product has been purchased',
                                                    data: lessProduct.map(product => (product.TotalSales)),
                                                    backgroundColor: [
                                                        'rgba(255, 99, 132, 0.4)',
                                                        'rgba(75, 192, 192, 0.4)',
                                                        'rgba(255, 205, 86, 0.4)',
                                                    ]
                                                },
                                            ],
                                        }}
                                    /> : null}
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Stats
