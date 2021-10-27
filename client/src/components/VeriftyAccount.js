import React from 'react';
import "./NftUpload.css"
import { verifyAccountInfo } from '../web3/main';
export default class VerifyAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = { address: '' };
    }
    

    //Events-
    //Invoke main files verifyaccountinfo method.
    finalSubmission = async () => {

        let data = await verifyAccountInfo(this.state.address);
        alert(JSON.stringify(data));


    }
    addressUpdate = async (e) => {

        this.setState({ address: e.target.value });

    }

    render() {
        return (
            <div className="container">
                <div className="content-container">


                    <div className="wrapper">
                        <label>Address:</label>
                        <input type="text" onChange={this.addressUpdate} />
                    </div>
                    <div className="wrapper">
                        <button onClick={this.finalSubmission}>Submit</button>
                    </div>
                </div>
            </div>
        )

    }
}