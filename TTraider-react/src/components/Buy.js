import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import apiCall from '../util/apiCall';

class Buy extends Component {
    state = {
        tslaprice: null
    }

    componentDidMount() {
        console.log('mount')
        if (this.state.tslaprice === null) {
            const promise = apiCall('/api/price/tsla')
            promise.then(blob => blob.json()).then(json => {
                const price = json.price
                this.setState({
                    tslaprice: price
                })
            })
        }
    }

    render() {
        console.log('render')
        let priceElement = (<div></div>)
        if (this.state.tslaprice !== null) {
            priceElement = (
                <div>
                    TSLA's current price is ${this.state.tslaprice}
                </div>
            )
        }

        return (
            <div className="buy">
                <p><h2>Buy Info </h2></p>
                {priceElement}
            </div>
        )
    }
}

export default Buy