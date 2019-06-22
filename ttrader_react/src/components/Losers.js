import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import ListItem from '../util/ListItem';
import '../Style.css';

class Losers extends Component {
    state = {
        losers: [],
        error: ""
    }
    getLosers() {
        const endpoint = "/api/get_ten/losers"
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({
                      losers : json.losers,
                      error : json.error,
                      statusCode: json.statuscode
                  })
              })
    }
    render() {
        let losersList = (<div></div>)
        if (this.state.error !== undefined) {
            losersList = (
                <div>
                    <div>Status code: {this.state.statusCode}: {this.state.error}</div>
                </div>
            )
        } else {
            losersList = (
                <div className="block">
                    <div className="infobox">
                        <div className="top">
                            Top-10 Losers stocks
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
                            <ListItem items={this.state.losers}/>
                        </table>
                    </div>
                </div>
            )}    
        return (
            <div>
                {losersList}
            </div>
        )
    }    
    componentDidMount() {        
        if(this.state.error === ""){
            this.getLosers()
        }
    }
}
export default Losers