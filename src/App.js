import Nav from './scenes/Nav'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './scenes/login/login'
import Register from './scenes/register/register'
import React from 'react'
import NavBar from './scenes/NavBar/NavBar'
import HomePage from './scenes/HomePage/homePage'
import Product from './scenes/Producteur/Products'
import DetailsProducts from './scenes/Producteur/Details'
import { Button, Grid, InputAdornment, TextField } from "@material-ui/core"
import loginImg from "./assets/img/login.png"
import BlueMarket from "./assets/img/BlueMarket.png"

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Nav} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/homePage" component={HomePage} />
          <Route path="/products" component={Product} />
          <Route path="/detailsProduct" component={DetailsProducts} />
        </Switch>
      </Router>
    </div >

  );
}

export default App;

/*
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
            <TextField label="Username" margin="normal" />
            <TextField label="Password" margin="normal" />
            <div style={{ height: 20 }} />
            <Button color="primary" variant="contained">
              Log in
            </Button>
            <div style={{ height: 20 }} />
            <Button> Interested in joining ?</Button>
          </div>
          <Grid container justify="center" space={2}>
            <Grid item>
              <Button> Forgot password ? </Button>
            </Grid>
          </Grid>
          <div />
        </Grid>
      </Grid>
*/
