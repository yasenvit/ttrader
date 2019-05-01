import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import apiCall from '../util/apiCall';

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <h3>Hello Vit!</h3>                
            </div>
        )
    }
}

export default Home