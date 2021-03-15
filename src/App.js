import Nav from './components/Nav'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/login/login'
import Register from './components/register/register'
import React from 'react'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Nav} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;