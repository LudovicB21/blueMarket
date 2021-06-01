import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField } from "@material-ui/core"
import loginImg from "../../assets/img/login.png"
import BlueMarket from "../../assets/img/BlueMarket.png"
import { Redirect, Link } from "react-router-dom"
import CircularProgress from '@material-ui/core/CircularProgress';

function LoginV2() {

    useEffect(() => {
        getAuth()
    }, [])

    const getAuth = () => {
        setAuth(JSON.parse(localStorage.getItem('user')))
    }

    const [details, setDetails] = useState({ email: "", password: "" });
    const [user, setUser] = useState({ email: "", role: "", firstname: "", lastname: "", fridgesize: 0, user_id: "" });
    const [error, setError] = useState("");
    const [auth, setAuth] = useState("");
    const [loading, setLoading] = useState(null)

    const submitHandler = e => {
        e.preventDefault();

        getLogin(details)
    }

    const getLogin = () => {
        setLoading(true)
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
                        fridgesize: data.size_fridge,
                        user_id: data.user_id
                    })
                    setLoading(false)
                } else {
                    setError(data.Login)
                    setLoading(false)
                }
            });
    }

    return (
        <div>
            {(user.email !== "") ? (
                <div>
                    {localStorage.setItem("user", JSON.stringify(user))}
                    {user.role === 0 && <Redirect to="/department" />}
                    {user.role === 1 && <Redirect to="/transition" />}
                    {user.role === 2 && <Redirect to="/products" />}
                </div>
            ) : (auth) ? (
                <div>
                    {auth.role === 0 && <Redirect to="/department" />}
                    {auth.role === 1 && <Redirect to="/transition" />}
                    {auth.role === 2 && <Redirect to="/products" />}
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
                                {loading == true ? <CircularProgress />
                                    : null}
                                <Button color="primary" id="LoginButton" variant="contained" type="submit">
                                    Log in
                                </Button>
                                <div style={{ height: 20 }} />
                                <Link to="/register">
                                    <Button style={{ width: "100%" }} color="primary" variant="contained"> Register </Button>
                                </Link>
                                <div style={{ height: 20 }} />
                                <Button style={{ width: "100%" }} color="primary" variant="contained">  Forgot password ?</Button>
                            </div>
                            <div />
                        </Grid>
                    </Grid>
                </form>
            )}
        </div>
    )
}

export default LoginV2