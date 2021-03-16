import Nav from './components/Nav'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/login/login'
import Register from './components/register/register'
import React from 'react'
import NavBar from './components/NavBar/NavBar'
function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Nav} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>

  );
}

export default App;