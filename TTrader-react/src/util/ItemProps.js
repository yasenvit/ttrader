import React, {Component} from 'react';
import apiCall from './apiCall';
import {Link} from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import '../Nav.css'

class ItemProps extends Component {
    
    render() {
        const roundTo = require('round-to')        
        return (
        <table className="table">
            <tr>
                <th width="7%" >Date</th>
                <th width="10%" >Ticker</th>
                <th width="14%" >Company Name</th>
                <th width="14%" >Sector</th>
                <th width="8%" >Lowest Price</th>
                <th width="8%" >Highest Price</th>
                <th width="8%" >Latest Price</th>
                <th width="12%" >YearToDateChange</th>
                <th width="12%" >Latest volume</th>
                <th></th>
            </tr>
            <tr>
                <td width="7%" >{this.props.item.latestTime}</td>
                <td width="10%" >{this.props.item.symbol}</td>
                <td width="14%">{this.props.item.companyName}</td>
                <td width="14%">{this.props.item.sector}</td>
                <td width="8%" ><CurrencyFormat value={this.props.item.low} displayType={'text'}
                 thousandSeparator={true} prefix={'$'}/></td>
                <td width="8%" ><CurrencyFormat value={this.props.item.high} displayType={'text'}
                 thousandSeparator={true} prefix={'$'}/></td>                
                <td width="8%"><CurrencyFormat value={this.props.item.latestPrice} displayType={'text'}
                 thousandSeparator={true} prefix={'$'}/></td>
                <td width="12%"><CurrencyFormat value={roundTo(this.props.item.ytdChange,2)} displayType={'text'}
                 thousandSeparator={true} prefix={'$'}/></td>
                <td width="12%">{this.props.item.latestVolume}</td>
                <td><Link to="/buy/"><button className="myButton" type="button" value={this.props.item.symbol}>Buy</button></Link></td>
            </tr>
        </table>
            )
    }
}
const itemStyle = { 
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderBottom: '1px #ccc dotted'

}
export default ItemProps