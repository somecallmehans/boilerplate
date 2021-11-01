import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Signup, Login } from './UserAuth';

const Routes = () => {
  return (
    <div>
    <Signup />
    <Login />
    </div>
  )
}

export default Routes;
