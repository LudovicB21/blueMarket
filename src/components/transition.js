import React from 'react'
import { Redirect } from 'react-router-dom';

function Transition() {
    const sizeScreen = () => {
        if (window.innerWidth > 768) {
            return <Redirect to="/market" />
        } else if (window.innerWidth < 768) {
            return <Redirect to="/recommendations" />
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
