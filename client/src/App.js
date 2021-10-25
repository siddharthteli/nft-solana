import React from 'react';
import {main} from './web3/main'

export default class App extends React.Component {


  click =async() =>{
    console.log("Button clicked");
    let temp=await main();
  }
  render(props){
    return(
      <div>
        <button onClick={this.click}>Submit</button>
      </div>
    )
  }
}