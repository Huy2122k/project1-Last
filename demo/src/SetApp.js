import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "./style/App.css";
import Sidebar from './Sidebar';
import About from './About';
import App from './App';
import Home from "./Home";
const SetApp = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={About} />
                <Route path="/About" component={About} />
            </Switch>
        </div>
    </Router>
    );
export default SetApp;