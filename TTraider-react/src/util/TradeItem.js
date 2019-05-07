import React, {Component} from 'react';
import TradeProps from './TradeProps'

class TradeItem extends Component {  

    render() {
        
       return this.props.trades.map((trade, index)=> (
            <div><TradeProps key={index} trade={trade} /></div>
        ))
        
    }
}
export default TradeItem