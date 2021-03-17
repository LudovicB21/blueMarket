import Nav from './components/Nav'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/login/login'
import Register from './components/register/register'
import React from 'react'
import NavBar from './components/NavBar/NavBar'
import HomePage from './components/HomePage/homePage'
function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Nav} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/homePage" component={HomePage} />
      </Switch>
    </Router>

  );
}

export default App;