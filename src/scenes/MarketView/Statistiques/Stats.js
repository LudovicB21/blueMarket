import React, { useEffect, useState } from 'react'
import NavBar from '../../NavBar/NavBar'
import { getAllStats } from "../../../services/Api/Statistics/get"
import CircularProgress from '@material-ui/core/CircularProgress';
import { PolarArea } from 'react-chartjs-2'

function Stats() {

    const [loading, setLoading] = useState(null)
    const [statistics, setStatistics] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        getAllStats().then(({ data, success, errors }) => {
            if (success === true) {
                setStatistics(data)
                setLoading(false)
            } else {
                setLoading(false)
                setError(errors)
            }
        })
    }, [])


    if (statistics !== []) {
        localStorage.setItem("statistics", JSON.stringify(statistics))
    }

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="mx-5 my-5">
                <h1>Statistics</h1>
                {error !== null ? <p style={{ color: "red" }}>{error.GetUserCart}</p> : ""}
                {loading == true ? <CircularProgress />
                    : <div>
                        <div style={{ border: "solid", borderRadius: "5%", borderColor: "gray" }}>
                            <h2> Average spend: {statistics?.MeanCartPrice}€</h2>
                        </div> <br></br>
                        <h2>Best product sell :</h2>
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
                    </div>
                }
            </div>
        </div>
    )
}

export default Stats
