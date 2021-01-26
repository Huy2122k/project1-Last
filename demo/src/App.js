import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from './Home';
import About from './About';
import indexz from '/Users/huy/Documents/project1/indexz';
class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <div className="App">
          <Route path="/hightlight" component={Home}/>
          <Route path="/index" component={indexz}/>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;