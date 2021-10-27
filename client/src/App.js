import React from 'react';
import {invoke} from './web3/main'
import NftUpload from './components/NftUpload';
export default class App extends React.Component {
  


  render(props){
    return(
      <div>
        <NftUpload/>
      </div>
    )
  }
}