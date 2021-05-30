import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'

function Commentary() {

    const [commentary, setCommentary] = useState([])
    const [show, setShow] = useState(null)
    const [loading, setLoading] = useState(null)
    const [allCommentaries, setAllCommentaries] = useState([])
    const [errors, setErrors] = useState(null)
    const [errorsCommentary, setErrorsCommentary] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
    }, [])


    const sendCommentary = () => {
        //Données à envoyer : Author de la réponse + description + userid + commentaryid
        setCommentary({ ...commentary, "author": user?.firstname + ' ' + user?.lastname })
        console.log(commentary)
    }

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="container mx-5 my-5">
                <h1> Author </h1>
                <h2> Date -  Object </h2>
                <p> Description</p>
            </div>
            <div className="container mx-5 my-5">
                <label htmlFor="text"> Answer  :</label>
                <textarea type="text-area" className="form-control" onChange={e => setCommentary({ ...commentary, "description": e.target.value })}></textarea> <br></br>
                <button className="btn btn-primary" onClick={sendCommentary}> Send  </button>
            </div>
        </div >
    )
}

export default Commentary
