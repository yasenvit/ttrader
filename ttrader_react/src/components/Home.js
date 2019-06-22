import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import CurrencyFormat from 'react-currency-format';
import '../Style.css';

class Home extends Component {
    state = {
       username : null,
       balance: null,
       investCost: null,
       currentCost: null,
       positionsQty: null,
       sharesQty: null,
       positions: null
    }
    getInfo () {
        const endpoint = `/api/${window.sessionStorage.getItem("apikey")}/summary`
        const promise = apiCall(endpoint,'get')
        promise.then(blob => blob.json()).then (json=> {
            this.setState({
                username : json.username,
                balance: json.balance,
                investCost: json.investCost,
                currentCost: json.currentCost,
                positionsQty: json.positionsQty,
                sharesQty: json.sharesQty,
                marginPercentage: json.marginPrcntg,
                positions: json.positions
            })
        })
    }    
    render() {
        const roundTo = require('round-to')        
        let userOutput = (<div></div>)
        if (this.state.username !== null) {
            userOutput = (
                <div className="block">
                    <table>
                        <tr>
                            <td colspan="2">Hello {this.state.username}</td> 
                        </tr>
                        <tr>
                            <th style={{width:"50%", textAlign:"end", backgroundColor:"white"}}>Balance total: </th>
                            <td style={{width:"50%", textAlign:"start", backgroundColor:"white"}}><CurrencyFormat value={roundTo(this.state.currentCost,2) +this.state.balance} displayType={'text'}
                            thousandSeparator={true} prefix={'$'}/></td>
                        </tr>
                        <tr>
                            <th style={{width:"50%", textAlign:"end", backgroundColor:"white"}}>Account cash balance: </th>
                            <td style={{width:"50%", textAlign:"start", backgroundColor:"white"}}><CurrencyFormat value={roundTo(this.state.balance,2)} displayType={'text'}
                                    thousandSeparator={true} prefix={'$'}/></td>
                        </tr>                            
                        <tr>
                            <th style={{width:"50%", textAlign:"end", backgroundColor:"white"}}>Portfolio cost: </th>
                            <td style={{width:"50%", textAlign:"start", backgroundColor:"white"}}><CurrencyFormat value={roundTo(this.state.currentCost,2)} displayType={'text'}
                            thousandSeparator={true} prefix={'$'}/></td>
                        </tr>
                        <tr>
                            <th style={{width:"50%", textAlign:"end", backgroundColor:"white"}}>Portfolio change %:</th>
                            <td style={{width:"50%", textAlign:"start", backgroundColor:"white"}}><CurrencyFormat value={roundTo(this.state.marginPercentage,2)} displayType={'text'}
                            thousandSeparator={true} prefix={'%'}/></td>
                        </tr>
                        <tr>
                            <th style={{width:"50%", textAlign:"end", backgroundColor:"white"}}>Positions: </th>
                            <td style={{width:"50%", textAlign:"start", backgroundColor:"white"}}>{this.state.positionsQty}</td>
                        </tr>
                        <tr>
                            <th style={{width:"50%", textAlign:"end", backgroundColor:"white"}}>Shares: </th>
                            <td style={{width:"50%", textAlign:"start", backgroundColor:"white"}}>{this.state.sharesQty}</td>
                        </tr>
                    </table>
                </div>               
            )
        }
        return (
            <div>
                {userOutput}                             
            </div>
        )
    }
    componentDidMount() {
        if(this.state.balance === null){
            this.getInfo()
        }
    }
}
export default Home