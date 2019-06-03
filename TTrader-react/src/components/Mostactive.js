import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import ListItem from '../util/ListItem';
import '../Style.css';

class Mostactive extends Component {
    state = {
        mostactive: [],
        error: ""
    }
    getMostactive() {
        const endpoint = "/api/get_ten/mostactive"
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  
                  this.setState ({
                      mostactive : json.mostactive,
                      error: json.error,
                      statusCode: json.statuscode
                  })
              })
    }
    
    render() {
        let mostactiveList = (<div></div>)
        console.log(this.state.error)
        if(this.state.error !== undefined) {
            mostactiveList = (
                <div>Status code: {this.state.statusCode}: {this.state.error}</div>
            )
        } else {
            mostactiveList = (
                <div className="block">
                    <div className="infobox">
                        <div className="top">
                            Top-10 Most active stocks
                        </div>
                        <table>
                            <tr style={{backgroundColor:"#cac1c1"}}>
                                <th width="10%" >Date</th>
                                <th width="5%" >Ticker</th>
                                <th width="20%" >Company Name</th>
                                <th width="10%" >Sector</th>
                                <th width="7%" >Lowest Price</th>
                                <th width="7%" >Highest Price</th>
                                <th width="7%" >Latest Price</th>
                                <th width="7%" >Year To Date Change</th>
                                <th width="7%" >Latest volume</th>
                                <th width="5%"></th>
                                <th width="5%"></th>
                            </tr>
                            <ListItem items={this.state.mostactive}/>
                        </table>
                    </div>
                </div>
            )}    
        return (
            <div>
                {mostactiveList}
            </div>
        )
    }    
    componentDidMount() {        
        if(this.state.error === ""){
            this.getMostactive()
        }
    }
}
export default Mostactive