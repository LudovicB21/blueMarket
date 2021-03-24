import React, { useContext } from 'react'
import NavBar from '../NavBar/NavBar'
//import { UserContext } from "../../store/userStore"

function HomePage() {
    //const auth = useContext(UserContext)
    //console.log(auth)

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
