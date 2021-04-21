import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField } from "@material-ui/core"
import loginImg from "../../assets/img/login.png"
import BlueMarket from "../../assets/img/BlueMarket.png"
import { Redirect, Link } from "react-router-dom"

function LoginV2() {

    useEffect(() => {
        getAuth()
    }, [])

    const getAuth = () => {
        setAuth(JSON.parse(localStorage.getItem('user')))
    }

    const [details, setDetails] = useState({ email: "", password: "" });
    const [user, setUser] = useState({ email: "", role: "", firstname: "", lastname: "", frigo: 0 });
    const [error, setError] = useState("");
    const [auth, setAuth] = useState("")

    const submitHandler = e => {
        e.preventDefault();

        getLogin(details)
    }

    const getLogin = () => {
        fetch(`https://bluemarket.shop/api/login?email=${details.email}&password=${details.password}`,
            {
                method: "GET",
            }).then(response => response.json())
            .then(data => {
                if (!data.Login) {
                    setUser({
                        email: data.user_email,
                        firstname: data.user_first,
                        lastname: data.user_last,
                        role: data.user_role,
                        frigo: data.user_size_Fridge
                    })
                } else {
                    setError(data.Login)
                }
            });
    }

    return (
        <div>
            {(user.email !== "") ? (
                <div>
                    {localStorage.setItem("user", JSON.stringify(user))}
                    {user.role === 0 && <Redirect to="/transition" />}
                    {user.role === 1 && <Redirect to="/products" />}
                    {user.role === 2 && <Redirect to="/spokes" />}
                </div>
            ) : (auth) ? (
                <div>
                    {auth.role === 0 && <Redirect to="/transition" />}
                    {auth.role === 1 && <Redirect to="/products" />}
                    {auth.role === 2 && <Redirect to="/spokes" />}
                </div>


            ) : (
                <form onSubmit={submitHandler}>
                    <Grid container style={{ minHeight: '100vh' }}>
                        <Grid item xs={12} sm={6}>
                            <img src={loginImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                        </Grid>
                        <Grid container item xs={12} sm={6} alignItems="center" direction="column" justify="space-between" style={{ padding: 10 }}>
                            <div />
                            <div style={{ display: "flex", flexDirection: "column", maxWidth: 400, minWidth: 300 }}>
                                <Grid container justify="center">
                                    <img src={BlueMarket} width={200} alt="logo" />
                                </Grid> <br></br>
                                {(error !== "") ? (<div className="error text-danger">{error}</div>) : ""}

                                <TextField label="Email" id="emailField" type="email" margin="normal" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                                <TextField label="Password" id="passwordField" type="password" margin="normal" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                                <div style={{ height: 20 }} />
                                <Button color="primary" id="LoginButton" variant="contained" type="submit">
                                    Log in
                        </Button>
                                <div style={{ height: 20 }} />
                                <Link to="/register">
                                    <Button> Interested in joining ?</Button>
                                </Link>
                            </div>
                            <Grid container justify="center" space={2}>
                                <Grid item>
                                    <Button> Forgot password ? </Button>
                                </Grid>
                            </Grid>
                            <div />
                        </Grid>
                    </Grid>
                </form>
            )}
        </div>
    )
}

export default LoginV2