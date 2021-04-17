import React from 'react'
import NavBar from '../NavBar/NavBar'

function HomePage() {

    const getData = () => {
        let data = localStorage.getItem('user')
        console.log(data)
    }

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className='home'>

                <button onClick={getData}> Get data </button>
            </div>
        </div>
    )
}

export default HomePage
