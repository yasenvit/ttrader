import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import PositionItem from '../util/PositionItem';
import CurrencyFormat from 'react-currency-format';
import '../Style.css';

class Positions extends Component {
    state = {
        username : null,
        balance: null,
        investCost: null,
        currentCost: null,
        positionsQty: null,
        sharesQty: null,
        positions: [],
        marginPrcntg: null
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
                 marginPrcntg: json.marginPrcntg,
                 positions: json.positions
             })
         })
     }    

render() {
    const roundTo = require('round-to')
    let positionsList = (<div></div>)
    if (this.state.balance !==null) {
        positionsList = (
            <div className="block">
                <div className="infobox">
                    <div className="top">
                        PORTFOLIO INFO                
                    </div>
                        <table>
                            <tr style={{backgroundColor:"#cac1c1"}}>
                                <th width="20%">Total positions</th>
                                <th width="20%">Total shares</th>
                                <th width="20%">Invested funds</th>
                                <th width="20%">Positions value</th>
                                <th width="20%">Change</th>
                            </tr>
                            <tr>
                                <td>{this.state.positionsQty}</td>
                                <td>{this.state.sharesQty}</td>
                                <td><CurrencyFormat value={roundTo(this.state.investCost,2)}displayType={'text'}
                            thousandSeparator={true} prefix={'$'}/></td>
                                <td><CurrencyFormat value={roundTo(this.state.currentCost,2)}displayType={'text'}
                            thousandSeparator={true} prefix={'$'}/></td>
                                <td><CurrencyFormat value={roundTo(this.state.marginPrcntg,2)}displayType={'text'}
                            thousandSeparator={true} prefix={'%'}/></td>
                            </tr>
                        </table>
                        
                    <div className="top">
                        POSITION LIST
                    </div>
                    <table>
                        <tr style={{backgroundColor:"#cac1c1"}}>
                            <th width="15%">Ticker</th>
                            <th width="15%">Shares</th>
                            <th width="20%">Invested funds</th>
                            <th width="20%">Position Value</th>
                            <th width="20%">Change</th>
                        </tr>              
                        <PositionItem positions={this.state.positions}/>
                    </table>
                </div>
            </div>
                   
               
           
        )
    }   
    return (
        <div>
            {positionsList}
        </div>
    )
}
componentDidMount() {    
    if(this.state.balance === null){
        this.getInfo()
    }
  }
}
export default Positions