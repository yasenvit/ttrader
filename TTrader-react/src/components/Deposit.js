import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import '../Style.css';

class Deposit extends Component {
    state = {
        username: "",
        positionsCurrentCost: null,
        balance : null,
        deposit:null
    }
    getInfo () {
        const endpoint = `/api/${window.sessionStorage.getItem("apikey")}/balance`
        const promise = apiCall(endpoint,'get')
        promise.then(blob => blob.json()).then (json=> {
            this.setState({
                positionsCurrentCost: json.positionsCurrentCost,
                balance: json.balance,
                username: json.username,
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
                deposit: inptamount
            })
        })
    }
    render() {
        const roundTo = require('round-to') 
        let CurrencyFormat = require('react-currency-format')  
        let depositstate = null
        if(this.state.deposit !== null) {
            depositstate = (
                <div>
                    <p>You have added <strong><CurrencyFormat value={this.state.deposit} displayType={'text'}
                     thousandSeparator={true} prefix={'$'}/></strong></p>                    
                    <p>New cash balance is <strong><CurrencyFormat value={roundTo(this.state.balance,2)} displayType={'text'}
                     thousandSeparator={true} prefix={'$'}/></strong></p>
                </div>
            )
        }
        let outpBalance =(<tr></tr>)
        
        if(this.state.balance !== null) {
            outpBalance = (
                <table width="50%">
                    <tr>
                        <th style={{width:"50%", textAlign:"end", backgroundColor:"white"}} >Cash Balance: </th>
                        <td style={{width:"50%", textAlign:"start", backgroundColor:"white"}} ><CurrencyFormat value={roundTo(this.state.balance,2)} displayType={'text'}
                            thousandSeparator={true} prefix={'$'}/></td>
                    </tr>
                    <tr>
                        <th style={{width:"50%", textAlign:"end", backgroundColor:"white"}}>Portfolio cost: </th>
                        <td style={{width:"50%", textAlign:"start", backgroundColor:"white"}}><CurrencyFormat value={roundTo(this.state.positionsCurrentCost,2)} displayType={'text'}
                            thousandSeparator={true} prefix={'$'}/></td>
                    </tr>
                    <tr>
                        <th style={{width:"50%", textAlign:"end", backgroundColor:"white"}}>Balance total: </th>
                        <td style={{width:"50%", textAlign:"start", backgroundColor:"white"}}><CurrencyFormat value={roundTo(this.state.positionsCurrentCost+this.state.balance,2)} displayType={'text'}
                            thousandSeparator={true} prefix={'$'}/></td>
                    </tr>
                </table>
            )
        }        
        return (
            <div className="block">
                <div className="infobox"> 
                    <div className="top">
                        ACCOUNT BALANCE
                    </div> 
                    {outpBalance}
                    <div className="top">
                        MAKE DEPOSIT
                    </div>
                    <div className="request">
                        <input className="input" id="deposit" placeholder="deposit"/>
                        <button className="myButton" onClick={(event)=>{                    
                        this.getDeposit(document.getElementById('deposit').value)                        
                        }}
                        >ADD</button>
                    </div>
                    {depositstate}
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