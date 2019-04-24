import React,{Component} from 'react';

class Logout extends Component {
    render() {
        return (
            <div className="Logout">
                <button onClick={this.props.clicked}>Log out</button>
            </div>
        )
    }
}

export default Logout