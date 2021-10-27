import React from 'react';
import "./NftUpload.css"
import {verifyAccountInfo} from '../web3/main';
export default class VerifyAccount  extends React.Component{
    constructor(props){
        super(props)
        this.state={address:''};
    }

    Clicked =async() => {
        console.log("insde clicked");
       let data=await verifyAccountInfo(this.state.address);
        alert(JSON.stringify(data));


    }
    Changed =async(e) => {
        console.log("insde clicked");
        this.setState({address:e.target.value});

    }

    render(){
        return(
            <div className="container">
                <div className="content-container">

               
                <div className="wrapper">
                <label>Address:</label>
                <input type="text" onChange={this.Changed}/>
                </div>
                <div className="wrapper">  
                    <button onClick={this.Clicked}>Submit</button>
                </div>
                </div>
            </div>
        )
        
    }
}