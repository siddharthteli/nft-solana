import { Keypair,SystemProgram,sendAndConfirmTransaction, Transaction, Connection, TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js";
import * as borsh from 'borsh';

export async function invoke(e:string) {
  console.log("value of num"+e);
    main(e).then(
        () => process.exit?.(-1),
        (err) => {
            console.error(err);
        }
    );

}



async function main(e:string) {

  let num=e;
  class GreetingAccount {
    txt:string='';
    constructor(fields:{txt:string} | undefined=undefined) {
      if(fields) {
        this.txt=fields.txt;
      }
    }
  }
  //

  const GreetingSchema = new Map([
  [GreetingAccount, {kind: 'struct', fields: [['txt', 'String']]}],
]);

  const sampleGreeter =new GreetingAccount();
  sampleGreeter.txt="00000000000000004";
  const  GREETING_SIZE=borsh.serialize(GreetingSchema,sampleGreeter).length;
   //

     //console.log("SIze greeting"+GREETING_SIZE);
      //
    let feePayer = Keypair.fromSecretKey(
             Uint8Array.from([183, 24, 219, 158, 145, 227, 59, 153, 68, 209, 188, 54, 95, 47, 59, 131, 223, 143, 101, 3, 35, 208, 224, 128, 111, 66, 113, 241, 221, 62, 215, 202, 74, 70, 182, 171, 100, 140, 55, 222, 82, 240, 81, 41, 113, 181, 17, 113, 99, 181, 56, 144, 64, 245, 12, 189, 86, 144, 95, 175, 105, 33, 29, 136]));
    let connection = new Connection("http://localhost:8899");
    let programId = new PublicKey("GoajUKZ1SjGBVu8uxaBcGJmdzbho7UyR9cyWTw3xz84E");
    let randomAccount = new Keypair();
    const GREETING_SEED = '3';
 
    const greetedPubkey = await PublicKey.createWithSeed(
        feePayer.publicKey,
    GREETING_SEED,
    programId,
  );

  console.log("address of ---"+greetedPubkey);
 
  const greetedAccountcheck = await connection.getAccountInfo(greetedPubkey);
console.log("greetedaccount exist ?--"+JSON.stringify(greetedAccountcheck));
  if(greetedAccountcheck=== null) {
  console.log("Inside if condition");
  console.log("Value of id"+programId);
 
  let lamports=await connection.getMinimumBalanceForRentExemption(
    GREETING_SIZE,
  );;
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
  const hash = await sendAndConfirmTransaction(connection, transaction, [
    feePayer,]
    );
}
    console.log(`random address: ${randomAccount.publicKey.toBase58()}`);
    let messageAccount=new GreetingAccount();
    messageAccount.txt=num;
    const instruction = new TransactionInstruction({
        keys: [{pubkey: greetedPubkey, isSigner: false, isWritable: true}],
        programId,
        data: Buffer.from(borsh.serialize(GreetingSchema,messageAccount)), // All instructions are hellos
      });
      console.log("After craeting tx");
      await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [feePayer]
        
      );

      console.log("Done...");
  

  }