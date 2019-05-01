import React, {Component} from 'react';
import TickerLookupProps from './TickerLookupProps'


class TickerLookupItem extends Component {
   
    render() {
       let obj = this.props.item
       return Object.keys(obj).map((point)=> (
            <div><TickerLookupProps point={point} value={obj[point]} /></div>
        ))
        
    }
}

export default TickerLookupItem