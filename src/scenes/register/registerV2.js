import React, { useState } from 'react';
import { Button, Grid, TextField } from "@material-ui/core"
import loginImg from "../../assets/img/th.jpg"
import BlueMarket from "../../assets/img/BlueMarket.png"
import { Redirect } from "react-router-dom"

function RegisterV2() {

    const [details, setDetails] = useState({ firstname: "", lastname: "", email: "", frigo: "", password: "", username: "" });
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
                    <Redirect to="/login" />
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
                                </Grid>
                                <TextField label="Username" margin="normal" onChange={e => setDetails({ ...details, username: e.target.value })} value={details.username} />
                                <TextField label="Email" type="email" margin="normal" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                                <TextField label="firstname" margin="normal" onChange={e => setDetails({ ...details, firstname: e.target.value })} value={details.firstname} />
                                <TextField label="lastname" margin="normal" onChange={e => setDetails({ ...details, lastname: e.target.value })} value={details.lastname} />
                                <TextField label="frigo" margin="normal" onChange={e => setDetails({ ...details, frigo: e.target.value })} value={details.frigo} />
                                <TextField label="Password" margin="normal" type="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                                <div style={{ height: 20 }} />
                                <Button color="primary" variant="contained" type="submit">
                                    Register
                                </Button>
                                <div style={{ height: 20 }} />

                            </div>

                            <div />
                        </Grid>
                    </Grid>
                </form>
            )}
        </div>
    )
}

export default RegisterV2
