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
    const [user, setUser] = useState({ email: "", role: "", password: "", id: 0, frigo: 0 });
    const [error, setError] = useState("");
    const [auth, setAuth] = useState("")

    const adminUser = {
        email: "admin@admin.com",
        password: "admin123",
        role: 0
    }

    const submitHandler = e => {
        e.preventDefault();

        loginForm(details)

    }


    const loginForm = details => {
        if (details.email === adminUser.email && details.password === adminUser.password) {
            setUser({
                password: details.password,
                email: details.email,
                role: adminUser.role,
                id: 1,
                frigo: 150,
                firstname: "ludovic",
                lastname: "braine"
            });
        } else {
            setError("Details not match ! ")
        }
    }

    return (
        <div>
            {(user.email !== "") ? (
                <div>
                    {localStorage.setItem("user", JSON.stringify(user))}
                    <Redirect to="/homePage" />
                </div>
            ) : (auth) ? (
                <Redirect to="/homePage" />
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
                                </Grid>
                                {(error !== "") ? (<div className="error">{error}</div>) : ""}

                                <TextField label="Email" type="email" margin="normal" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                                <TextField label="Password" type="password" margin="normal" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                                <div style={{ height: 20 }} />
                                <Button color="primary" variant="contained" type="submit">
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