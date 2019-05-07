import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import CurrencyFormat from 'react-currency-format';

class Deposit extends Component {
    state = {
        username: "",
        positionsCurrentCost: null,
        balance : null,
        amount:null
    }
    getInfo () {
        const endpoint = `/api/${window.sessionStorage.getItem("apikey")}/balance`
        const promise = apiCall(endpoint,'get')
        promise.then(blob => blob.json()).then (json=> {
            this.setState({
                positionsCurrentCost: json.positionsCurrentCost,
                balance: json.balance,
                username: json.username
            })
        })
    }
    getDeposit = (inptamount) => {
        const endpoint = "/api/" + window.sessionStorage.getItem("apikey") + "/deposit"
        const promise = apiCall(endpoint, 'put', {
            amount:inptamount
        })
        promise.then(blob=>blob.json()).then(json=>{
            this.setState({
                balance: json.balance,
                amount:inptamount
            })
        })
    }
    render() {
        const roundTo = require('round-to') 
        let CurrencyFormat = require('react-currency-format')  
        let outpDeposit = null
        if(this.state.amount !== null) {
            outpDeposit=(
                <div className="outp">
                    <p>You added <CurrencyFormat value={this.state.amount} displayType={'text'}
                     thousandSeparator={true} prefix={'$'}/></p>                    
                    <p>New balance <CurrencyFormat value={roundTo(this.state.balance,2)} displayType={'text'}
                     thousandSeparator={true} prefix={'$'}/></p>
                </div>
            )
        }
        let updatedBalance =(<tr></tr>)
        let outpBalance = (<div></div>)
        if(this.state.balance !== null) {
            updatedBalance = (
                <tr>
                <td width="10%" >Cash Balance</td>
                <td width="20%" ><CurrencyFormat value={roundTo(this.state.balance,2)} displayType={'text'}
                         thousandSeparator={true} prefix={'$'}/></td>
            </tr>
            ) 
            outpBalance = (
            <div>                
                <table>
                <tr>
                    <td width="10%">Username:</td>
                    <td width="20%" >{this.state.username}</td>
                    
                </tr>
                {updatedBalance}
                <tr style={{ backgroundColor:'#f4f4f4'}}>
                    <td width="10%" >Portfolio cost</td>
                    <td width="20%" ><CurrencyFormat value={roundTo(this.state.positionsCurrentCost,2)} displayType={'text'}
                     thousandSeparator={true} prefix={'$'}/></td>
                </tr>
                <tr>
                    <td width="10%" >Balance total</td>
                    <td width="20%" ><CurrencyFormat value={roundTo(this.state.positionsCurrentCost,2) +this.state.balance} displayType={'text'}
                     thousandSeparator={true} prefix={'$'}/></td>
                </tr>
                </table>
            </div>            
        )}        
        return (
            <div className="outrow">
                <div className="outcolumn">
                    <h4>Deposit to account</h4>
                    <input className="input" id="deposit" placeholder="deposit"/>
                    <button className="myButton" onClick={(event)=>{                    
                        this.getDeposit(document.getElementById('deposit').value)                        
                        }}
                        >ADD</button>
                        {outpDeposit}  
                </div>
                <div className="outcolumn">
                    {outpBalance}
                </div>                           
            </div>
        )
    }
    componentDidMount() {
        if(this.state.balance === null){
            this.getInfo()           
        }
    }
}
export default Deposit