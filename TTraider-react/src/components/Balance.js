import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import CurrencyFormat from 'react-currency-format';
import '../Nav.css'

class Balance extends Component {
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
    render() {
        const roundTo = require('round-to') 
        let CurrencyFormat = require('react-currency-format')
        let output = (<div></div>)
        if(this.state.balance !== null) {
            output = (
                <div>                
                <table>
                <tr>
                    <td width="10%">Username:</td>
                    <td width="20%" >{this.state.username}</td>                    
                </tr>
                    <td width="10%" >Cash Balance</td>
                    <td width="20%" ><CurrencyFormat value={roundTo(this.state.balance,2)} displayType={'text'}
                            thousandSeparator={true} prefix={'$'}/></td>
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
            )
        }
        return (
            <div>
                {output}   
            </div>
        )
    }
    componentDidMount() {
        if(this.state.balance === null){
            this.getInfo()
        }
    }
}
export default Balance