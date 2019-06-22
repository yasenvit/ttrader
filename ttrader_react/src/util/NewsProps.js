import React, {Component} from 'react';
import '../Style.css';


class NewsProps extends Component {
    
    render() {        
       return (
        <div style={itemStyle}>
            <p>Date:{this.props.item.datetime}</p>
            Source URL: <a href={this.props.item.url} target="_blank" rel="noopener noreferrer" style={{color:"blue"}}>{this.props.item.url}</a>
            <h4>Headline: {this.props.item.headline}</h4>
            <p>{this.props.item.summary}</p>
        </div>
            )
    }
}
const itemStyle = {
    backgroundColor: 'white',
    padding: '10px',
    borderBottom: '1px #ccc dotted',
    textAlign:'start'

}
export default NewsProps