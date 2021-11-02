import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Signup, Login } from './UserAuth';

const Routes = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/signup">Sign Up</Link>
          <Link to="login">Login</Link>
        </nav>
        <main>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
        </main>
      </div>
    </Router>
  )
}

export default Routes;
