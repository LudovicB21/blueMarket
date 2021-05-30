import React, { useState } from 'react'
import NavBar from '../NavBar/NavBar'

function commentary() {

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="container mx-5 my-5">
                <h1> Author </h1>
                <h2> Date -  Object </h2>
                <p> Description</p>
                <div>
                    <button className="btn btn-primary"> Answer the author</button>
                </div>
            </div>
        </div>
    )
}

export default commentary
