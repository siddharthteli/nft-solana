import { Keypair, SystemProgram, sendAndConfirmTransaction, Transaction, Connection, TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js";
import * as borsh from 'borsh';


//To invoke main method & pass argument .
export async function invoke(url: string) {

  console.log("value of ipfsaddress" + url);
  main(url).then(
    () => process.exit?.(-1),
    (err) => {
      console.error(err);
    }
  );

}



async function main(ipfsaddress: string) {
  //Same schema we have on chain 
  class GreetingAccount {
    txt: string = '';
    constructor(fields: { txt: string } | undefined = undefined) {
      if (fields) {
        this.txt = fields.txt;
      }
    }
  }

  //Schema.
  const GreetingSchema = new Map([
    [GreetingAccount, { kind: 'struct', fields: [['txt', 'String']] }],
  ]);

  //Creating sample data .
  const sampleGreeter = new GreetingAccount();
  //Same length as IPFS Url .
  sampleGreeter.txt = "00000000000000000000000000000000000000000000000000000000000000000000000000000000";
  //Ful size requried by account to store ipfs url .
  const GREETING_SIZE = borsh.serialize(GreetingSchema, sampleGreeter).length;
  console.log("Total size for account-- " + GREETING_SIZE);


  // This is from solana key pair we create. 
  let feePayer = Keypair.fromSecretKey(
    Uint8Array.from([183, 24, 219, 158, 145, 227, 59, 153, 68, 209, 188, 54, 95, 47, 59, 131, 223, 143, 101, 3, 35, 208, 224, 128, 111, 66, 113, 241, 221, 62, 215, 202, 74, 70, 182, 171, 100, 140, 55, 222, 82, 240, 81, 41, 113, 181, 17, 113, 99, 181, 56, 144, 64, 245, 12, 189, 86, 144, 95, 175, 105, 33, 29, 136]));
  //Connecting to local  cluster.
    let connection = new Connection("https://api.devnet.solana.com");
    //Program id of deployed program .
  let programId = new PublicKey("GoajUKZ1SjGBVu8uxaBcGJmdzbho7UyR9cyWTw3xz84E");

  //Random seed to create account with .
  const GREETING_SEED = '5';
  console.log("Fee payer "+JSON.stringify(feePayer.publicKey.toBase58()));
  //Initiliaze  new account with seed & owner & payer pre specified .
  //This new account will be used to store all data.
  const greetedPubkey = await PublicKey.createWithSeed(
    feePayer.publicKey,
    GREETING_SEED,
    programId,
  );

  console.log("address of ---" + greetedPubkey);
  
// checking if account already exist with same seed & config .
//If it exist we cannot change data field size .
  const greetedAccountcheck = await connection.getAccountInfo(greetedPubkey);
  if (greetedAccountcheck === null) {
    console.log("Inside if condition");
    console.log("Value of id" + programId);

    let lamports = await connection.getMinimumBalanceForRentExemption(
      GREETING_SIZE,
    );

    //If account doesn't exist .
    //we create new account.
    //Creating new account with custom field is like transaction only .
    //By defeault we invoke system program here.
    //Also updating owner field .
    const transaction = new Transaction().add(
      SystemProgram.createAccountWithSeed({
        fromPubkey: feePayer.publicKey,
        basePubkey: feePayer.publicKey,
        seed: GREETING_SEED,
        newAccountPubkey: greetedPubkey,
        lamports,
        space: GREETING_SIZE,
        programId,
      }),
    );
    //Waiting for transaction to confirm.
    const hash = await sendAndConfirmTransaction(connection, transaction, [
      feePayer,]
    );
  }

  //craeting new instance of data & init it with our ipfs url 
  //this url will be sended as instruction to chain .
  //chain will update account data value with instruction value .
  let messageAccount = new GreetingAccount();
  messageAccount.txt = ipfsaddress;
  const instruction = new TransactionInstruction({
    keys: [{ pubkey: greetedPubkey, isSigner: false, isWritable: true }],
    programId,
    data: Buffer.from(borsh.serialize(GreetingSchema, messageAccount)), // All instructions are hellos
  });

  //Waiting for transaction to confirm.
  const tx_hash=await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [feePayer]

  );

  console.log("Done...+tx_hash----"+tx_hash);


}



export async function verifyAccountInfo(address: string) {
  //Init new pubkey from string type of address.
  let pubkey = new PublicKey(address);
  //connecting to local cluster
  let connection = new Connection("https://api.devnet.solana.com");
  console.log("Value of address passed to check" + address);
  //getting account Info struct .
  //Will return null if it doesn't exist.
  const greetedAccountcheck = await connection.getAccountInfo(pubkey);
  console.log("Account Info struct---"+JSON.stringify(greetedAccountcheck));
  return greetedAccountcheck?.data.toString();

}