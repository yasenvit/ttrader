import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import NewsItem from '../util/NewsItem';
import CurrencyFormat from 'react-currency-format';
import '../Style.css';

class TickerLookup extends Component {
    state = {
        price: null,
        ticker: null,
        open: null,
        close: null,
        high: null,
        low: null,
        volume: null,
        change: null,
        changePercent: null,
        date: null,
        news: null,
        exchange: null                   
    }
    
    getInfo(ticker) {
        const endpoint = `/api/company/${ticker}`
        const promise = apiCall(endpoint,"get")
        promise.then(blob=>blob.json()).then (json=> {
            this.setState ({ 
                ticker: json.ticker,
                price: json.price, 
                companyName: json.companyName,
                sector: json.sector,
                industry: json.industry,
                ceo: json.CEO,
                description: json.description,
                exchange: json.exchange
            })
        })
    }
    getRecent(ticker) {
        const endpoint = `/api/stock/${ticker}`
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({                        
                        open: json.open,
                        close: json.close,
                        high: json.high,
                        low: json.low,
                        volume: json.volume,
                        change: json.change,
                        changePercent: json.changePercent,
                        date: json.date                        
                  })
              })
    }
    getNews(ticker) {
        const endpoint = `/api/news/${ticker}`
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({                        
                        news: json
                  })
              })
    }
    render() {
        console.log(this.state.price)
        const roundTo = require('round-to')
        let info = (<div></div>)
        let activity = (<div></div>)
        let news = (<div></div>)

        if (this.state.news !== null) {
            news = (
                <div>
                    <div className="top">
                        RELATED NEWS
                    </div>
                    <NewsItem items = {this.state.news}/>
                </div>
            )
        }  

        if (this.state.change !== null) {
            info = (
            <div>
                <table>
                    <tr>                        
                        <th width="30%">Ticker</th>
                        <td width="30%">{this.state.ticker}</td>
                    </tr>
                    <tr>
                        <th width="30%">Company Name</th>
                        <td width="60%" >{this.state.companyName}</td>
                    </tr>
                    <tr>
                        <th width="30%">CEO</th>
                        <td width="60%" >{this.state.ceo}</td>
                    </tr>
                    <tr>
                        <th width="30%">Sector</th>
                        <td width="60%" >{this.state.sector}</td>
                    </tr>
                    <tr>
                        <th width="30%">Industry</th>
                        <td width="60%" >{this.state.industry}</td>
                    </tr>
                    <tr>
                        <th width="30%">Description</th>
                        <td width="60%" >{this.state.description}</td>
                    </tr>
                </table>
            </div>
            )
            activity =(
                <div>
                    <div className="top">
                            LATEST ACTIVITY
                    </div>
                    <table>
                        <tr>                        
                            <th width="30%">Exchange</th>
                            <td width="60%">{this.state.exchange}</td>
                        </tr>
                        <tr>                        
                            <th width="30%">Price</th>
                            <td width="60%">{this.state.price}</td>
                        </tr>
                        <tr>                        
                            <th width="30%">Volume</th>
                            <td width="60%">{this.state.volume}</td>
                        </tr>
                        <tr>                        
                            <th width="30%">Price (open)</th>
                            <td width="60%"><CurrencyFormat value={this.state.open} displayType={'text'}
                            thousandSeparator={true} prefix={'$'}/></td>
                        </tr>
                        <tr>                        
                            <th width="30%">Price (close)</th>
                            <td width="60%"><CurrencyFormat value={this.state.close} displayType={'text'}
                            thousandSeparator={true} prefix={'$'}/></td>
                        </tr>
                        <tr>                        
                            <th width="30%">Lowest price</th>
                            <td width="60%"><CurrencyFormat value={this.state.low} displayType={'text'}
                            thousandSeparator={true} prefix={'$'}/></td>
                        </tr>
                        <tr>                        
                            <th width="30%">Highest price</th>
                            <td width="60%"><CurrencyFormat value={this.state.high} displayType={'text'}
                            thousandSeparator={true} prefix={'$'}/></td>
                        </tr>
                        <tr>                        
                            <th width="30%">Price change</th>
                            <td width="60%"><CurrencyFormat value={roundTo(this.state.change,2)} displayType={'text'}
                            thousandSeparator={true} prefix={'$'}/></td>
                        </tr>
                        <tr>                        
                            <th width="30%">Price change</th>
                            <td width="60%"><CurrencyFormat value={roundTo(this.state.changePercent,2)} displayType={'text'}
                            thousandSeparator={true} prefix={'%'}/></td>
                        </tr>
                    </table>
                </div>
            )
        }
        return (
            <div className="block">
                <div className="infobox">
                    <div className="top">
                        STOCK INFO
                    </div>
                    <div className="request">
                        <input className="input" id="ticker" placeholder="ticker"/>
                        <button className="myButton" onClick = {(event)=> {
                            this.getInfo(document.getElementById('ticker').value)
                            this.getRecent(document.getElementById('ticker').value)
                            this.getNews(document.getElementById('ticker').value)
                        }}
                        > show </button>
                    </div>
                    <div>
                        {info}
                        {activity}
                        {news}
                    </div>
                </div>
            </div>                    
        )
    }
}
export default TickerLookup