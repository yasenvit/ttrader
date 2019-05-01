import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import apiCall from '../util/apiCall';


class Balance extends Component {
    
    state = {
        balance: null,
        error:""
    }


    getBalance = () => {
        const endpoint = "/api/" + window.sessionStorage.getItem("apikey") + "/balance"
        const promise = apiCall(endpoint)
        promise.then(blob =>blob.json()).then(json =>
            {
                this.setState({
                    balance : json.balance
                })
            })
            }
    render() {
        
        return (
            <div className="shares">
                <p><h2>Balance </h2></p>    
                <p>{this.state.balance}</p>            
            </div>
        )
    }
    componentDidMount() {
        if(this.state.balance === null){
            this.getBalance()
        }
    }

}


export default Balance