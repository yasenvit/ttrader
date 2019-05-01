import React, {Component} from 'react';

class TradeProps extends Component {
    
    render() {
        
        
       return (
           <div style={itemStyle}>
                <div>Ticker '{this.props.trade.ticker}' / Shares {this.props.trade.shares} / Price {this.props.trade.price} / Transaction
                 cost $ {this.props.trade.shares*this.props.trade.price}</div>
            </div>
            )
    }
}
const itemStyle = {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderBottom: '1px #ccc dotted'

}
export default TradeProps