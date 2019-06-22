import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import '../Style.css';
import CurrencyFormat from 'react-currency-format';

class PositionFor extends Component {
    state = {
        ticker: null,
        shares: null,
        positionValue: null,
        currentPrice: null,
        investCost: null,
        error: "",
        statusCode: ""
        }
    getPositionFor(inptticker) {
        const endpoint = `/api/${window.sessionStorage.getItem("apikey")}/position_for/${inptticker}`
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({
                    ticker: json.ticker,
                    shares: json.shares,
                    positionValue: json.positionValue,
                    currentPrice: json.currentPrice,
                    investCost: json.investCost,
                    error: json.error,
                    statusCode: json.statuscode
                })
              })
    }
    render() {
        const roundTo = require('round-to')        
        let positionList=(<div></div>)
        if (this.state.error === undefined) {
            positionList = (
                <div>
                    <div className="top">
                        POSITION SUMMARY               
                    </div>
                    <table>
                        <tr>
                            <th width="20%">Position</th>
                            <th width="20%">Shares</th>
                            <th width="20%">Price</th>
                            <th width="20%">Position value</th>
                            <th width="20%">Change since purchasing</th>
                        </tr>
                        <tr>
                            <td>{this.state.ticker}</td>
                            <td>{this.state.shares}</td>
                            <td><CurrencyFormat value={this.state.currentPrice}displayType={'text'}
                              thousandSeparator={true} prefix={'$'}/></td>
                            <td><CurrencyFormat value={this.state.positionValue}displayType={'text'}
                              thousandSeparator={true} prefix={'$'}/></td>
                            <td><CurrencyFormat value={roundTo((this.state.positionValue-this.state.investCost)/this.state.investCost*100,2)} displayType={'text'}
                                thousandSeparator={true} />%</td>
                        </tr>
                    </table>
                </div>   
            )
        } else {
            if (this.state.error.length > 0) {
            positionList = (
                <div>Status code: {this.state.statusCode}: {this.state.error}</div>
            )}
        }
        return (
            <div className="block">
                <div className="infobox">
                    <div className="top">
                        SHOW POSITION FOR
                    </div>
                    <div className="request">
                        <input className="input" id="ticker" placeholder="ticker"/>
                        <button className="myButton" onClick = {(event)=> {
                            this.getPositionFor(document.getElementById('ticker').value)
                        }}
                        > show </button>
                    </div>
                    
                    {positionList}
                </div>                              
            </div>
        )
    }   
}
export default PositionFor