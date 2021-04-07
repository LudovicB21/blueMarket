import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import { CircleProgress } from 'react-gradient-progress'

function Fridge() {

    const items = [
        {
            nom: "item1",
            size: 2
        },
        {
            nom: "item2",
            size: 75
        },
        {
            nom: "item3",
            size: 3
        }
    ]

    useEffect(() => {
        let total = 0
        items.forEach(item => {

            total += item.size;
        });
        setProgression(total)
    })

    const [progression, setProgression] = useState(0)
    const [panier, setPanier] = useState(0)

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div>

            </div>
            <div className="mx-5 my-5">
                <h1>Utilisation de votre frigo </h1>
                <CircleProgress percentage={progression} strokeWidth={5} />
                {/*<button onClick={addItemInFridge()}> Add new item </button>*/}
            </div>
        </div>
    )
}

export default Fridge
