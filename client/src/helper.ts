import {NFTStorage,File} from 'nft.storage';
import {invoke} from './web3/main';
const apiKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhBODc1MzgzYzA5NGIzNjYxOTEyNDI4Yzc5YUEwYTA4MkMzN0M4RUIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNDcyOTQ3NjY4MywibmFtZSI6InRlc3QifQ.-O6WCaI9RkbXaMKmKlDF3IlodFWm5GyDeNeE2WBzhiU';
const client=new NFTStorage({token:apiKey});

export async function pushDataToNft(file:File,des:string,title:string) {
    console.log('Inside nft helper');
    const metaData=await client.store({
        name:title,
        description:des,
        image:file
    })

    console.log("Meta data "+metaData.url);
    await invoke(metaData.url);

    

}