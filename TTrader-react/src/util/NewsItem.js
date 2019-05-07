import React, {Component} from 'react';
import NewsProps from './NewsProps'


class NewsItem extends Component {
   
    render() {
        console.log(this.props.items[0])
       return this.props.items.map((item, index)=> (
            <div><NewsProps key={index} item={item} /></div>
        ))
        
    }
}

export default NewsItem