import React from "react";
import { pushDataToNft } from '../helper'
import './NftUpload.css'

export default class NftUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = { file: '', des: '', title: '' };

    }


    //Events-

    //When file is updated
    fileUpdate = (e) => {
        console.log("Inside fileUpdate");
        this.setState({ file: e.target.files[0] });
    }
    //When description field is updated
    descriptionUpdate = (e) => {
        console.log("Inside descriptionUpdate");
        this.setState({ des: e.target.value });
    }
    //When title field is updated
    titleUpdate = (e) => {
        console.log("Inside titleUpdate");
        this.setState({ title: e.target.value });
    }
    //Invoke main files pushdatatonft method.
    onSubmit = () => {
        console.log("Inside onSubmit");
        pushDataToNft(this.state.file, this.state.des, this.state.title);

    }



    render() {
        return (
            <div className="container">
                <div className="content-container">
                    <div className="wrapper">
                        <input type="file" onChange={this.fileUpdate} />
                    </div>
                    <div className="wrapper">
                        <label>Name:</label>  <input type="text" onChange={this.titleUpdate} />
                    </div>

                    <div className="wrapper">
                        <label>Des:</label>
                        <input type="text" onChange={this.descriptionUpdate} />
                    </div>
                    <div className="wrapper">
                        <button type="submit" onClick={this.onSubmit}>Submit</button>
                    </div>

                </div>
            </div>
        )
    }

}