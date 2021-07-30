import React, {Component} from 'react';
import './App.css';
import Home from './Home';
import Discover from './Discover';
import Register from './Register';
import Login from './Login';
import Reset from './Reset';
import {Route} from "react-router-dom";

class App extends Component {
    render() {
      return (
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/discover" component={Discover} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
        </div>
      );
    }
}

export default App;
