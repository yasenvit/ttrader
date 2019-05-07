import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import ListItem from '../util/ListItem'

class Losers extends Component {
    state = {
        losers: null
    }
    getLosers() {
        const endpoint = "/api/get_ten/losers"
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({
                      losers : json.losers
                  })
              })
    }
    render() {
        let losersList = (<div></div>)
        if (this.state.losers !==null) {
            losersList = (
                <div>
                    <ListItem items={this.state.losers}/>
                </div>
            )}    
        return (
            <div>
                <h3>Top-10 Losers stocks</h3>

                {losersList}  

            </div>
        )
        }    
    componentDidMount() {        
        if(this.state.losers === null){
            this.getLosers()
        }
    }
}
export default Losers