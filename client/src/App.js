import React from 'react';
import {invoke} from './web3/main'
import NftUpload from './components/NftUpload';
import VerifyAccount from './components/VeriftyAccount'
export default class App extends React.Component {
  


  render(props){
    return(
      <div>
        <NftUpload/>
        <VerifyAccount/>
      </div>
    )
  }
}