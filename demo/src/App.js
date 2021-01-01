import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from './Home';
import About from './About';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route path="/hightlight" component={Home}/>
          <Route path="/about" component={About}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;