import React, {Component} from 'react';
import CurrencyFormat from 'react-currency-format';
import '../Nav.css'

class TradeProps extends Component {    
    render() {
        return (
            <table className="table">
                <tr>
                    <th width="14%">Date and time</th>
                    <th width="7%">Ticker</th>
                    <th width="10%">Shares</th>
                    <th width="14%">Price</th>
                </tr>
                <tr>
                    <td width="7%" >{this.props.trade.time}</td>
                    <td width="7%" >{this.props.trade.ticker}</td>
                    <td width="10%" >{this.props.trade.shares}</td>
                    <td width="14%"><CurrencyFormat value={this.props.trade.price} displayType={'text'}
                     thousandSeparator={true} prefix={'$'}/></td>
                </tr>
            </table>
            )
    }
}
export default TradeProps