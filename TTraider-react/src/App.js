import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import './Nav.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import login from './util/login';
import Login from './components/Login';
import Logout from './components/Logout';
import Sell from './components/Sell';
import Buy from './components/Buy';
import UserName from './components/UserName';
import Trades from './components/Trades';
import Deposit from './components/Deposit';
import Positions from './components/Positions';
import isloggedin from './util/isloggedin';
import logout from './util/logout';
import Nav from './components/Nav';
import image from './mancity.jpg';
import apiCall from './util/apiCall';

class App extends Component {
  state={
    refresh:"",
    error:""
  }

  login = (username, password) => {
    const promise = apiCall('/api/get_api_key', 'post', {
      username: username,
      password: password
    })
    promise.then(blob=>blob.json()).then(json=>{

        console.log(json)
      if (json.api_key !== undefined) {
        window.sessionStorage.setItem("apikey", json.api_key)
        window.sessionStorage.setItem("username", json.username)
        this.setState({
          refresh: "loggedin",
          error: ""
        })
      }
      else {
        this.setState({
          refresh: "login error",
          error: "Could not log in"
        })  
      }
    })
  }


  logoutClick=(event)=>{
    event.preventDefault()
    logout()
    this.setState({refresh: "loggedout"})
  }
  render() {
    let routelist=[]
    let getHome=[]
    let getGreetings=[]
    let getLogin=[]
    let getLogout=[]
    let mainroutelist=[]
    let nav=[]
    if (isloggedin()){
      routelist= [
        <Route exact path="/deposit" component={Deposit}/>, 
        <Route exact path="/UserName" component={UserName}/>,
        <Route exact path="/Trades" component={Trades}/>,
        <Route exact path="/Sell" component={Sell}/>,
        <Route exact path="/Positions" component={Positions}/>,
        <Route exact path="/Buy" component={Buy}/>,             
        <Route exact path="/" render={(props)=><Logout {...props} clicked={this.logoutClick}/>}/>
        ]
      getHome= [<Route exact path="/" component={Home}/>]
      getLogout= [<Route exact path="/" render={(props)=><Logout {...props} clicked={this.logoutClick}/>}/>]        
      mainroutelist=[
        <div className="row">
          <div className="columnL">
            <div className="nav">
              <Nav/>
            </div>
          </div>
          <div className="columnR">
            <div className="outp">
            {routelist}
            </div>            
              </div>}   
              </div>]
    } else {
        getLogin=[<Route path="/" render={(props)=><Login {...props} loginfunc={this.login} />} />]
        getGreetings=[<h2>Welcome to React Terminal trader</h2>]
        mainroutelist= [
          <div className="row">
            <div className="column">
              <img src={image} className="stretch" alt="city" /> 
            </div>
          </div>
          ]
      }
    return (
      <BrowserRouter>
      <div className='box'>
        <div className="row">
          <div className="column">
          </div>
          <div className="column">
            <div className="hello">
              {getHome}
              {getGreetings}
            </div>
          </div>
          <div className="column">
            <div className="log">
              {getLogin}
              {getLogout}
            </div>
          </div>  
        </div>
        <div className="row">
          {mainroutelist}
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
