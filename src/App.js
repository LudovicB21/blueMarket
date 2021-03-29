import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import HomePage from './scenes/HomePage/homePage'
import Product from './scenes/Producteur/Products'
import DetailsProducts from './scenes/Producteur/Details'
import LoginV2 from "./scenes/login/loginV2"
import RegisterV2 from "./scenes/register/registerV2"
import Logout from "./scenes/LogOut/logout"
import Scan from "./scenes/ScanPage/scan"

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={LoginV2} />
          <Route path="/login" component={LoginV2} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterV2} />
          <Route path="/homePage" component={HomePage} />
          <Route path="/products" component={Product} />
          <Route path="/scan" component={Scan} />
          <Route path="/detailsProduct" component={DetailsProducts} />
        </Switch>
      </Router>
    </div >

  );
}

export default App;
