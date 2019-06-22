import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import TradeItem from '../util/TradeItem';
import CurrencyFormat from 'react-currency-format';
import '../Style.css';

class TradesFor extends Component {
    state={
        trades: null,
        ticker:null,
        shares: null,
        currentPrice: null,
        positionValue: null,
        investCost: null
    }
    getTradesFor (inptticker) {
        const endpoint = `/api/${window.sessionStorage.getItem("apikey")}/trades_for/${inptticker}`
        const promise = apiCall(endpoint,'get')
        promise.then(blob => blob.json()).then (json=> {
            
            this.setState({
                trades: json.trades,
            })
        } )
    }
    getPositionFor(inptticker) {
        const endpoint = `/api/${window.sessionStorage.getItem("apikey")}/position_for/${inptticker}`
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({
                    ticker: json.ticker,
                    shares: json.shares,
                    price: json.currentPrice,
                    positionValue: json.positionValue,
                    investCost: json.investCost
                })
              })
    } 
    render() {
        const roundTo = require('round-to')
        let positionInfo = (<div></div>)
        let tradesList = (<div></div>)

        if (this.props.match.params.ticker === undefined) {
            if(this.state.ticker !== null) {
                positionInfo = (
                    <div>
                        <div className="top">
                            POSITION SUMMARY               
                        </div>
                        <table>
                            <tr>
                                <th width="20%">Position</th>
                                <th width="20%">Shares</th>
                                <th width="20%">Price</th>
                                <th width="20%">Change</th>
                            </tr>
                            <tr>
                                <td>{this.state.ticker}</td>
                                <td>{this.state.shares}</td>
                                <td><CurrencyFormat value={this.state.price}displayType={'text'}
                                thousandSeparator={true} prefix={'$'}/></td>
                                <td><CurrencyFormat value={roundTo((this.state.positionValue-this.state.investCost)/this.state.investCost*100,2)} displayType={'text'}
                                    thousandSeparator={true} />%</td>
                            </tr>
                        </table>
                    </div>   
                )
            }
            if (this.state.trades !== null) {
                tradesList = (
                    <div className="infobox">
                        <div className="top">
                            TRADES HISTORY FOR '{this.state.ticker}'
                        </div>
                        <table>
                            <tr style={{backgroundColor:"#cac1c1"}}>
                                <th width="15%">Date and time</th>
                                <th width="20%">Ticker</th>
                                <th width="20%">Shares</th>
                                <th width="20%">Price</th>
                                <th width="20%">Transaction cost</th>
                            </tr>
                            <TradeItem trades={this.state.trades}/>
                        </table>
                    </div>
                )
            }
            return (
                <div className="block">
                    <div className="infobox">
                        <div className="top">
                            SHOW TRADES HISTORY FOR
                        </div>
                        <div className="request">
                            <input className="input" id="ticker" placeholder="ticker"/>
                            <button className="myButton" onClick = { (event) => {
                            this.getTradesFor(document.getElementById('ticker').value)
                            this.getPositionFor(document.getElementById('ticker').value)
                            }}
                            >show</button>
                        </div>
                            {positionInfo}
                            {tradesList} 
                    </div>                                 
                </div>
            )
        } else {
            if(this.state.ticker !== null) {
                positionInfo = (
                    <div>
                        <div className="top">
                            POSITION SUMMARY                
                        </div>
                        <table>
                            <tr style={{backgroundColor:"#cac1c1"}}>
                                <th width="20%">Position</th>
                                <th width="20%">Shares</th>
                                <th width="20%">Price</th>
                                <th width="20%">Change</th>
                            </tr>
                            <tr>
                                <td>{this.state.ticker}</td>
                                <td>{this.state.shares}</td>
                                <td><CurrencyFormat value={this.state.price}displayType={'text'}
                                thousandSeparator={true} prefix={'$'}/></td>
                                <td><CurrencyFormat value={roundTo((this.state.positionValue-this.state.investCost)/this.state.investCost*100,2)} displayType={'text'}
                                    thousandSeparator={true} />%</td>
                            </tr>
                        </table>
                    </div>   
                )
            }
            if (this.state.trades !== null) {
                tradesList = (
                    <div className="infobox">
                        <div className="top">
                            TRADES HISTORY FOR '{this.state.ticker}'
                        </div>
                        <table>
                            <tr style={{backgroundColor:"#cac1c1"}}>
                                <th width="15%">Date and time</th>
                                <th width="20%">Ticker</th>
                                <th width="20%">Shares</th>
                                <th width="20%">Price</th>
                                <th width="20%">Transaction cost</th>
                            </tr>
                            <TradeItem trades={this.state.trades}/>
                        </table>
                    </div>
                )
            }
        return (
            <div className="block">
                <div className="infobox">

                    {positionInfo}
                    
                    {tradesList} 
                </div>                               
            </div>
        )
        }
    }
    componentDidMount() {        
        if(this.props.match.params.ticker !== undefined){
            this.getTradesFor(this.props.match.params.ticker)
            this.getPositionFor(this.props.match.params.ticker)
        }
    }
}
export default TradesFor