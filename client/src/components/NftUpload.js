import React from "react";
import { pushDataToNft } from '../helper'
import './NftUpload.css'

export default class NftUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { file: '', des: '', title: '' };

    }
    //Event triggred on input update.
    OnChange = (e) => {
        console.log("Changed");
        this.setState({ file: e.target.files[0] });
        console.log("Value of state---" + this.state.file);

    }

    desChanged = (e) => {
        console.log("Inside description changed");
        this.setState({ des: e.target.value });
    }

    titleChanged = (e) => {
        console.log("Inside description changed");
        this.setState({ title: e.target.value });
    }
    //Event trigged on 
    OnClick = () => {
        console.log("Clicked");
        pushDataToNft(this.state.file, this.state.des, this.state.title);

    }

    render() {
        return (
            <div className="container">
                <div className="content-container">
                <div className="wrapper">
                    <input type="file" onChange={this.OnChange} />
                </div>
                <div className="wrapper">
                <label>Name:</label>  <input type="text" onChange={this.desChanged} />
                </div>

              <div className="wrapper">
                  <label>Des:</label>
              <input type="text" onChange={this.titleChanged} />
              </div>
              <div className="wrapper">
              <button type="submit" onClick={this.OnClick}>Submit</button>
              </div>
               
              </div>
            </div>
        )
    }

}