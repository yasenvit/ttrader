import React, {Component} from 'react';
import '../Style.css';

class SignUp extends Component {
    
    render() {
        
        return (
            <div className="signup">
                <p>Welcome to place where you can make money!</p>
                <h4>Sign up here</h4>
                <p></p>
                <input className="input" style={{width:"200px"}} id="user" placeholder="username"/>
                <p></p>
                <input className="input" style={{width:"200px"}} id="pass" placeholder="password"/>
                <p></p>
                <button className="myButton" style={{width:"200px"}} onClick={(event)=>{
                this.props.signupfunc(document.getElementById('user').value,document.getElementById('pass').value
                )
            }}
            >sign up</button>
            </div>
        ) 
        }    
    }
export default SignUp