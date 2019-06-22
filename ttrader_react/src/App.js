import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Link} from 'react-router-dom'
import './Style.css';
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
import SignUp from './components/SignUp';
import apiCall from './util/apiCall';

class App extends Component {
  state={
    refresh:"",
    error:"",
    username:null
  }

  signup = (username, password) => {
    const promise = apiCall('/api/signup', 'post', {
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
          error: "Could not sign up"
        })
      }
    })
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
          error: "",
          username: json.username
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
    
    let home = []
    let routelist=[]
    let LoginLogout=[]
    let mainoutput=[]
    let SignUpBlock=[]
    if (isloggedin()){
      routelist= [
        <Route exact path="/" component={Home}/>,
        <Route exact path="/balance" component={Balance}/>,
        <Route exact path="/deposit" component={Deposit}/>,
        <Route exact path="/trades" component={Trades}/>,
        <Route exact path="/tradesfor" component={TradesFor}/>,
        <Route exact path="/tradesfor/:ticker" component={TradesFor}/>,
        <Route exact path="/buy" component={Buy}/>,
        <Route exact path="/buy/:ticker" component={Buy}/>,
        <Route exact path="/sell" component={Sell}/>,
        <Route exact path="/sell/:ticker" component={Sell}/>,
        <Route exact path="/positions" component={Positions}/>,
        <Route exact path="/positionfor" component={PositionFor}/>,
        <Route exact path="/stock" component={TickerLookup}/>,
        <Route exact path="/mostactive" component={Mostactive}/>, 
        <Route exact path="/gainers" component={Gainers}/>,
        <Route exact path="/losers" component={Losers}/>,
        <Route exact path="/iexvolume" component={Iexvolume}/>,
        <Route exact path="/iexpercent" component={Iexpercent}/>,  
        <Route exact path="/infocus" component={Infocus}/>,
                
        ]
      LoginLogout= [<Logout clicked={this.logoutClick}/>]        
      home = [<Link to="/" >HOME</Link>]
      mainoutput=[
        <div className="body">
              <div id="left" className="column-left-signed">
              <div className="top-left">
                  
                    {home}
                 
              </div>
              
              <div className="bottom-left">
              <Nav/>
              </div>
          </div>
          <div id="right" className="column-right-signed">
              <div className="top-right">
                  <div className="top-spot">
                      
                  </div>
                  <div className="top-spot">
                    Terminal Trader
                  </div>
                  <div className="top-spot">
                    <div className="spot-elem">
                      {LoginLogout}
                    </div>
                    <div className="spot-elem">
                      username: {window.sessionStorage.getItem("username")}
                    </div>
                  </div>
              </div>
              <div className="bottom-right-signed">
              {routelist}
              </div>
          </div>
        </div>
      ]
    } else {
        LoginLogout=[<Link to="/login" >SIGN IN</Link>]
        SignUpBlock=[<Link to="/signup" >SIGN UP</Link>]
        home = [<Link to="/" >TERMINAL TRADER</Link>]
        routelist=[
              <Route exact path="/signup" render={(props)=><SignUp {...props} signupfunc={this.signup} />}/>,
              <Route path="/login" render={(props)=><Login {...props} loginfunc={this.login} />} />         
             ]
        mainoutput= [ 
        <div className="body">
          <div id="left" className="column-left">
            <div className="top-left">
                <div></div>
            </div>          
            <div className="bottom-left">
            </div>
          </div>
          <div id="right" className="column-right">
            <div className="top-right">
              <div className="top-spot">
              </div>
              <div className="top-spot">
                {home}
              </div>
              <div className="top-spot">
                <div className="spot-elem">
                  {LoginLogout}
                </div>
                <div className="spot-elem">
                  {SignUpBlock}
                </div>
              </div>
            </div>
            <div className="bottom-right">
              {routelist}
            </div>
          </div>
        </div>         
            ]
      }
    return (
      <BrowserRouter>
        <div className="box">
        {mainoutput}
        </div>
            
        
      </BrowserRouter>
    );
  }
}
export default App;
