import React,{Component} from 'react';

class Login extends Component {
    render() {
        return (
            <div className="Login">
                <input id='username' placeholder='username' size="15" onChange={()=>null} />
                <input id='password' type='password' placeholder='password'size="20" onChange={()=>null} />
                <button onClick={(event)=>{
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