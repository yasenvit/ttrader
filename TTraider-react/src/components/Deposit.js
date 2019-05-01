import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import apiCall from '../util/apiCall';

class Deposit extends Component {
    state = {
        balance : null,
        amount:null
    }
    getDeposit = (inptamount) => {

   const endpoint = "/api/" + window.sessionStorage.getItem("apikey") + "/deposit"
   const promise = apiCall(endpoint, 'put', {
    amount:inptamount
   })
  promise.then(blob=>blob.json()).then(json=>{
            this.setState({
                balance:json.balance,
                amount:inptamount
            })
    })
}
    
    render() {
        console.log(this.state.balance)
        let outpDeposit = null
        if(this.state.balance !== null) {
            outpDeposit=(
                <div>
                    <p style={itemStyle}>You added ${this.state.amount}</p>                    
                    <p style={itemStyle}>Your new balance ${this.state.balance}</p>
                </div>
            )
        }
        
        return (
            <div className="deposit">
                <p><h2>Deposit</h2></p>
                <input className="pad" id="deposit" placeholder="deposit"/>
                <button onClick={(event)=>{
                    
                    this.getDeposit(document.getElementById('deposit').value)
                           
                }}
                >ADD</button>
                {outpDeposit}    
            </div>
        )
    }
}
const itemStyle = {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderBottom: '1px #ccc dotted'

}
export default Deposit