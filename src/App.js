import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { LOGIN_REQUEST, LOGOUT } from './actions/actionTypes';
import './App.css';
import logo from './logo.svg';
import configureStore from './store/configureStore';

const store = configureStore();

class App extends Component {
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(){
    store.dispatch({type:LOGIN_REQUEST, user:'NoriSte', password:'password'});
  }

  logout(){
    store.dispatch({type:LOGOUT});
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <div>
            <button onClick={this.login}>Login</button>
            <button onClick={this.logout}>Logout</button>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
