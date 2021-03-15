import React, { useState } from 'react';
import HomePage from "../HomePage/homePage"

function Register() {

    const [details, setDetails] = useState({ firstname: "", lastname: "", email: "", password: "" });
    const [user, setUser] = useState({ name: "", email: "" });
    const [error, setError] = useState("");

    const adminUser = {
        email: "admin@admin.com",
        password: "admin123"
    }

    const submitHandler = e => {
        e.preventDefault();

        register(details)

    }

    const register = details => {
        if (details.email === adminUser.email && details.password === adminUser.password) {
            setUser({
                name: details.name,
                email: details.email
            });
        } else {
            setError("Details not match ! ")
        }
    }

    return (
        <div>
            {(user.email !== "") ? (
                <div>
                    <HomePage />
                </div>
            ) : (
                <form onSubmit={submitHandler}>
                    <div className="App">
                        <div className="form-inner">
                            <h2> Register </h2>
                            {(error !== "") ? (<div className="error">{error}</div>) : ""}
                            <div className="form-group">
                                <label htmlFor="firstname"> Firstname: </label>
                                <input type="text" firstname="firstname" id="firstname" onChange={e => setDetails({ ...details, firstname: e.target.value })} value={details.firstname} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname"> lastname: </label>
                                <input type="text" lastname="lastname" id="lastname" onChange={e => setDetails({ ...details, lastname: e.target.value })} value={details.lastname} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email"> Email: </label>
                                <input type="email" email="email" id="email" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password"> Password: </label>
                                <input type="password" password="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                            </div>
                            <input type="submit" value="Login" /> <br />
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}

export default Register;
