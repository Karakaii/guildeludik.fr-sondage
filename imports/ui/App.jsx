import React from 'react';

//Importing elements to make routes
import { BrowserRouter as Router, Route } from 'react-router-dom';

//Importing components
import Admin from './admin/Admin';
import Sondage from './sondage/Sondage';

export const App = () => {

  return (
    <>
      <Router>
        <Route path="/admin" component={Admin} />
        <Route path="/sondage" component={Sondage} />
      </Router>
    </>
  )
}
