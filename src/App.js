import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LOGIN_REQUEST, LOGOUT } from './actions/actionTypes';
import './App.css';
import logo from './logo.svg';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div>
          <button onClick={this.props.login}>Login</button>
          <button onClick={this.props.logout}>Logout</button>
        </div>
        <p>token: {this.props.token || 'empty'}</p>
        <p>status: {this.props.status || ''}</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.login.token,
    status: state.login.status,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch({type:LOGIN_REQUEST, user:'NoriSte', password:'password'}),
    logout: () => dispatch({type:LOGOUT}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
