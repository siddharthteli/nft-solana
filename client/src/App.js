import React from 'react';
import {invoke} from './web3/main'

export default class App extends React.Component {
  

  constructor(props){
    super(props)
    this.state={num:''};
  }


  click =async() =>{
    console.log("Button clicked");
    let temp=await invoke(this.state.num);
  }
  changed =async(e) =>{
    console.log("Button clicked");
    this.setState({num:e.target.value})
  
  }
  render(props){
    return(
      <div>
        <input type="text" onChange={this.changed}/>
        <button onClick={this.click}>Submit</button>
      </div>
    )
  }
}