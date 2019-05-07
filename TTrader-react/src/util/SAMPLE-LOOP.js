import React, {Component} from 'react';
import apiCall from './apiCall';


class MostactiveProps extends Component {
    
    render() {        
       let description = ""
       for (let key in this.props.mostactive) {
           description += `${key}: ${this.props.mostactive[key]} |`
       }
       return (
           <div style={itemStyle}>
            {description}
           </div>
           /*
           <div style={itemStyle}>
                {
                    for (let key of this.props.mostactive) {

                    }
                }
                <div>Ticker "{this.props.mostactive.symbol}" | Company Name: {this.props.mostactive.companyName} | Sector: {this.props.mostactive.sector}
                  | Latest Price: {this.props.mostactive.latestPrice} | Change: {this.props.mostactive.change} | Latest Volume: {this.props.mostactive.latestVolume}</div>
            </div>
            )
            */
       )
    }
}
const itemStyle = {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderBottom: '1px #ccc dotted'

}
export default MostactiveProps