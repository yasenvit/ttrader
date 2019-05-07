import React, {Component} from 'react';
import apiCall from './apiCall';


class NewsProps extends Component {
    
    render() {        
       return (
        <div style={itemStyle}>
            <ul>
                <li><h4>Headline: {this.props.item.headline}</h4></li>
                <li><p>Date:{this.props.item.datetime}</p></li>
                <li><p>{this.props.item.summary}</p></li>
            </ul>
        </div>
            )
    }
}
const itemStyle = {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    borderBottom: '1px #ccc dotted'

}
export default NewsProps