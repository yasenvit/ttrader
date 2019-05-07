import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import CurrencyFormat from 'react-currency-format';
import '../Nav.css'

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
                <div>
                    <table>
                        <tr>
                            <td colspan="2">Welcome {this.state.username}</td> 
                        </tr>
                        <tr>
                            <td width="10%" >Balance total</td>
                            <td width="20%" ><CurrencyFormat value={roundTo(this.state.currentCost,2) +this.state.balance} displayType={'text'}
                            thousandSeparator={true} prefix={'$'}/></td>
                        </tr>
                        <tr style={{ backgroundColor:'#f4f4f4'}}>
                            <td width="10%" >Account cash balance</td>
                            <td width="20%" ><CurrencyFormat value={roundTo(this.state.balance,2)} displayType={'text'}
                                    thousandSeparator={true} prefix={'$'}/></td>
                        </tr>                            
                        <tr style={{ backgroundColor:'#f4f4f4'}}>
                            <td width="10%" >Portfolio cost</td>
                            <td width="20%" ><CurrencyFormat value={roundTo(this.state.currentCost,2)} displayType={'text'}
                            thousandSeparator={true} prefix={'$'}/></td>
                        </tr>
                        <tr style={{ backgroundColor:'#f4f4f4'}}>
                            <td width="10%" >Portfolio change %</td>
                            <td width="20%" ><CurrencyFormat value={roundTo(this.state.marginPercentage,2)} displayType={'text'}
                            thousandSeparator={true} prefix={'%'}/></td>
                        </tr>
                        <tr style={{ backgroundColor:'#f4f4f4'}}>
                            <td width="10%" >Positions</td>
                            <td width="20%" >{this.state.positionsQty}</td>
                        </tr>
                        <tr style={{ backgroundColor:'#f4f4f4'}}>
                            <td width="10%" >Shares</td>
                            <td width="20%" >{this.state.sharesQty}</td>
                        </tr>
                    </table>
                </div>               
            )
        }
        return (
            <div>
                
                <h3>{userOutput}</h3>
                                
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