import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter, Switch, Route } from 'react-router-dom'

// import store from './redux';
 
// import { Provider } from 'react-redux'
import Header from './components/header';
import Content from './components/content';


class App extends Component {
  render() {


    return (
      <div>
        <Header />
        <Content />
      </div>
    );
  }
}

export default App;
