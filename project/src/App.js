import React, { Component } from 'react';
import Content from './Components/content.js'
import Header from './Components/header.js'
import Footer from './Components/footer.js'
import Form from './Components/form.js'
import Home from './Components/Home.js'
import AccountDetail from './Components/account.js'
import './App.css';
// import SendMoney from './Components/'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import store from './redux';

import { Provider } from 'react-redux'


class App extends Component {
  render() {


    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header />

            <Switch>
              <Route path="/account" component={AccountDetail} />
              <Route path="/form" component={Form} />
              <Route exact path="/" component={Home} />
              <Route path="/" component={Home} />
            </Switch>

            <Footer />
            <AccountDetail />
          </div>
        </BrowserRouter>

      </Provider>
    );
  }
}

export default App;
