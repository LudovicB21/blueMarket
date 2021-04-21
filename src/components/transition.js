import React from 'react'
import { Redirect } from 'react-router-dom';

function Transition() {
    const sizeScreen = () => {
        if (window.innerWidth > 768) {
            return <Redirect to="/purchasePC" />
        } else if (window.innerWidth < 768) {
            return <Redirect to="/scan" />
        }
    }

    return (
        <div>
            <div>
                {sizeScreen()}
            </div>
        </div>
    )
}

export default Transition
