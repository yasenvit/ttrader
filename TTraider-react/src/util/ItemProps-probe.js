import React, {Component} from 'react';
import apiCall from './apiCall';


class ItemProps extends Component {
    
    render() {
        let output = ""
        for (let key in this.props.item){
            output +=
            
                <li>`${key}: ${this.props.item[key]}`</li>            
        }        
        return (
            <div style={itemStyle}>
             {output}
            </div>
                )
    }
}
const itemStyle = {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderBottom: '1px #ccc dotted'

}
export default ItemProps