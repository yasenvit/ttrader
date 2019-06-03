import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import '../Style.css';

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
                <div className="block">
                    <div className="infobox">
                        <div className="top">
                            BALANCE INFO
                        </div>
                        <table>
                            <tr>
                                <td style={{width:"50%", textAlign:"end", backgroundColor:"white"}}>Username:</td>
                                <td style={{width:"50%", textAlign:"start", backgroundColor:"white"}}>{this.state.username}</td>                    
                            </tr>
                                <td style={{width:"50%", textAlign:"end", backgroundColor:"white"}}>Cash Balance</td>
                                <td style={{width:"50%", textAlign:"start", backgroundColor:"white"}}><CurrencyFormat value={roundTo(this.state.balance,2)} displayType={'text'}
                                    thousandSeparator={true} prefix={'$'}/></td>
                            <tr>
                                <td style={{width:"50%", textAlign:"end", backgroundColor:"white"}}>Portfolio cost</td>
                                <td style={{width:"50%", textAlign:"start", backgroundColor:"white"}}><CurrencyFormat value={roundTo(this.state.positionsCurrentCost,2)} displayType={'text'}
                                    thousandSeparator={true} prefix={'$'}/></td>
                            </tr>
                            <tr>
                                <td style={{width:"50%", textAlign:"end", backgroundColor:"white"}}>Balance total</td>
                                <td style={{width:"50%", textAlign:"start", backgroundColor:"white"}}><CurrencyFormat value={roundTo(this.state.positionsCurrentCost +this.state.balance,2)} displayType={'text'}
                                   thousandSeparator={true} prefix={'$'}/></td>
                            </tr>
                        </table>
                    </div>
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