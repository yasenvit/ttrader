import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import image from './mancity.jpg';
import './Nav.css';
import isloggedin from './util/isloggedin';
import logout from './util/logout';
import Nav from './components/Nav';
import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import Balance from './components/Balance';
import Deposit from './components/Deposit';
import Trades from './components/Trades';
import TradesFor from './components/TradesFor';
import Buy from './components/Buy';
import Sell from './components/Sell';
import Positions from './components/Positions';
import PositionFor from './components/PositionFor';
import TickerLookup from './components/TickerLookup';
import Mostactive from './components/Mostactive';
import Gainers from './components/Gainers';
import Losers from './components/Losers';
import Iexvolume from './components/Iexvolume';
import Iexpercent from './components/Iexpercent';
import Infocus from './components/Infocus';


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
    let onHead=[]
    let LoginLogout=[]
    let mainroutelist=[]
    let nav=[]
    if (isloggedin()){
      routelist= [
        <Route exact path="/" component={Home}/>,
        <Route exact path="/balance" component={Balance}/>,
        <Route exact path="/deposit" component={Deposit}/>,        
        <Route exact path="/trades" component={Trades}/>,
        <Route exact path="/trades_for" component={TradesFor}/>,
        <Route exact path="/buy" component={Buy}/>,
        <Route exact path="/sell" component={Sell}/>,
        <Route exact path="/positions" component={Positions}/>,
        <Route exact path="/position_for" component={PositionFor}/>,
        <Route exact path="/stock" component={TickerLookup}/>,
        <Route exact path="/mostactive" component={Mostactive}/>, 
        <Route exact path="/gainers" component={Gainers}/>, 
        <Route exact path="/losers" component={Losers}/>,
        <Route exact path="/iexvolume" component={Iexvolume}/>,
        <Route exact path="/iexpercent" component={Iexpercent}/>,  
        <Route exact path="/infocus" component={Infocus}/>, 
        ]
      onHead= [<Route exact path="/" component={Home}/>]
      LoginLogout= [<Route exact path="/" render={(props)=><Logout {...props} clicked={this.logoutClick}/>}/>]        
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
              </div>   
              </div>]
    } else {
        LoginLogout=[<Route path="/" render={(props)=><Login {...props} loginfunc={this.login} />} />]
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
              <h5>Welcome to React Terminal trader</h5>
            </div>
          </div>
          <div className="column">
            <div className="log">
              {LoginLogout}
            </div>
          </div>  
        </div>
        <div className="wrapper">
          {mainroutelist}
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
