import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import apiCall from '../util/apiCall';
import ListItem from '../util/ListItem'


class Mostactives extends Component {
    state = {
        mostactives: null
    }
    getMostactives() {
        const endpoint = "/api/get_ten/mostactive"
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({
                      mostactives : json.mostactive
                  })
              })
    }
    render() {
        let mostactivesList = (<div></div>)
        if (this.state.mostactives !==null) {
            mostactivesList = (
                <div>
                    <ListItem items={this.state.mostactives}/>
                </div>
            
            
            )}    
        return (
            <div>
                <h3>Top-10 Most active stocks</h3>
                {mostactivesList}                
            </div>
        )
        }    
    componentDidMount() {        
        if(this.state.mostactives === null){
            this.getMostactives()
        }
    }
}
export default Mostactives