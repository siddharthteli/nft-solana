import React from 'react';
import {invoke} from './web3/main'

export default class App extends React.Component {


  click =async() =>{
    console.log("Button clicked");
    let temp=await invoke();
  }
  render(props){
    return(
      <div>
        <button onClick={this.click}>Submit</button>
      </div>
    )
  }
}