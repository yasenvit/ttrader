import React,{Component} from 'react';

class Login extends Component {
    render() {
        return (
            <div className="Login">
                <input id='username' placeholder='username' onChange={()=>null} />
                <input id='password' type='password' placeholder='password' onChange={()=>null} />
                <button onClick={(event)=>{
                    console.log('clicked')
                    this.props.loginfunc(
                        document.getElementById('username').value,
                        document.getElementById('password').value
                    )
                }}
                >Log In</button>
            </div>
        )
    }
}

export default Login