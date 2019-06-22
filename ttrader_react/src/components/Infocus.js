import React, {Component} from 'react';
import apiCall from '../util/apiCall';
import ListItem from '../util/ListItem';
import '../Style.css';

class Infocus extends Component {
    state = {
        infocus: [],
        error: ""
    }
    getInfocus() {
        const endpoint = "/api/get_ten/infocus"
        const promise = apiCall(endpoint,"get")
              promise.then(blob=>blob.json()).then (json=> {
                  this.setState ({
                      infocus : json.infocus,
                      error : json.error,
                      statusCode: json.statuscode
                  })
              })
    }
    render() {
        let infocusList = (<div></div>)
        if (this.state.error !== undefined) {
            infocusList = (
                <div>
                    <div>Status code: {this.state.statusCode}: {this.state.error}</div>
                </div>
            )
        } else {
            infocusList = (
                <div className="block">
                    <div className="infobox">
                        <div className="top">
                            Top-10 stocks in focus
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
                            <ListItem items={this.state.infocus}/>
                        </table>
                    </div>
                </div>
            )}    
        return (
            <div>
                {infocusList}
            </div>
        )
    }    
    componentDidMount() {        
        if(this.state.error === ""){
            this.getInfocus()
        }
    }
}
export default Infocus