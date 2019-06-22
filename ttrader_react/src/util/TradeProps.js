import React, {Component} from 'react';
import CurrencyFormat from 'react-currency-format';
import {Link} from 'react-router-dom';
import '../Style.css';

class TradeProps extends Component {    
    render() {
        const roundTo = require('round-to')
        const linkTradesFor = `/tradesfor/${this.props.trade.ticker}`
        
        return (
            
            <tr>
                <td width="15%" >{this.props.trade.time}</td>
                <td><Link style={{color:"blue"}} to={linkTradesFor}>{this.props.trade.ticker}</Link></td>
                <td width="20%" >{this.props.trade.shares}</td>
                <td width="20%"><CurrencyFormat value={this.props.trade.price} displayType={'text'}
                thousandSeparator={true} prefix={'$'}/></td>
                <td width="20%"><CurrencyFormat value={roundTo(this.props.trade.tradeCost,2)} displayType={'text'}
                thousandSeparator={true} prefix={'$'}/></td>
            </tr>
        )
    }
}
export default TradeProps