import { Keypair,SystemProgram,sendAndConfirmTransaction, Transaction, Connection, TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js";
import * as borsh from 'borsh';




// export default async function main() {
//     // 5zwi8GthH6vj3u7uQg9dTsbKSsaeVvseC4nwPLjD4eTy
// let feePayer = Keypair.fromSecretKey(
//     Uint8Array.from([183, 24, 219, 158, 145, 227, 59, 153, 68, 209, 188, 54, 95, 47, 59, 131, 223, 143, 101, 3, 35, 208, 224, 128, 111, 66, 113, 241, 221, 62, 215, 202, 74, 70, 182, 171, 100, 140, 55, 222, 82, 240, 81, 41, 113, 181, 17, 113, 99, 181, 56, 144, 64, 245, 12, 189, 86, 144, 95, 175, 105, 33, 29, 136])
// );
// // class GreetingAccount {
// //     counter = 0;
// //     constructor(fields: {counter: number} | undefined = undefined) {
// //       if (fields) {
// //         this.counter = fields.counter;
// //       }
// //     }
// //   }
  
// //   const GreetingSchema = new Map([
// //     [GreetingAccount, {kind: 'struct', fields: [['counter', 'u32']]}],
// //   ]);
 

// // // your program
// // let programId = new PublicKey("GoajUKZ1SjGBVu8uxaBcGJmdzbho7UyR9cyWTw3xz84E");
// //     let connection = new Connection("http://localhost:8899");
// //     let randomAccount = new Keypair();
// //     console.log(`random address: ${randomAccount.publicKey.toBase58()}`);


// //     const GREETING_SEED = 'hello';

// //     let greetedPubkey = await PublicKey.createWithSeed(
// //       feePayer.publicKey,
// //       GREETING_SEED,
// //       programId,
// //     );
    
// //     let greetedPubkey2 = await PublicKey.createWithSeed(
// //         randomAccount.publicKey,
// //         GREETING_SEED,
// //         programId,
// //       );
// //       const GREETING_SIZE = borsh.serialize(
// //         GreetingSchema,
// //         new GreetingAccount(),
// //       ).length;
      

// //       const greetedAccount = await connection.getAccountInfo(greetedPubkey);
// //       if (greetedAccount === null) {
// //         console.log(
// //           'Creating account',
// //           greetedPubkey.toBase58(),
// //           'to say hello to',
// //         );
// //         const lamports = await connection.getMinimumBalanceForRentExemption(
// //           GREETING_SIZE,
// //         );
    
// //         const transaction = new Transaction().add(
// //           SystemProgram.createAccountWithSeed({
// //             fromPubkey: feePayer.publicKey,
// //             basePubkey: feePayer.publicKey,
// //             seed: GREETING_SEED,
// //             newAccountPubkey: greetedPubkey,
// //             lamports,
// //             space: GREETING_SIZE,
// //             programId,
// //           }),
// //         );
// //         await sendAndConfirmTransaction(connection, transaction, [feePayer]);
// //       }
// //       let tx = new Transaction();
// //       tx.add(
// //           new TransactionInstruction({
// //               keys: [
// //                   {
// //                       pubkey: greetedPubkey,
// //                       isSigner: false,
// //                       isWritable: true,
// //                   },
// //                   {
// //                       pubkey: greetedPubkey2,
// //                       isSigner: false,
// //                       isWritable: true,
// //                   },
// //               ], // account meta, program will receive the same order array
// //               data: Buffer.from(new Uint8Array([1, 2, 3, 4, 5])), // data
// //               programId: programId,
// //           })
// //       );
// //       console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer])}`);
//     }


export async function invoke() {
    main().then(
        () => process.exit?.(-1),
        (err) => {
            console.error(err);
        }
    );

}



async function main() {
    class GreetingAccount {
        counter = 0;
        constructor(fields: {counter: number} | undefined = undefined) {
          if (fields) {
            this.counter = fields.counter;
          }
        }
      }
      const GreetingSchema = new Map([
        [GreetingAccount, {kind: 'struct', fields: [['counter', 'u32']]}],
      ]);
      const GREETING_SIZE = borsh.serialize(
        GreetingSchema,
        new GreetingAccount(),
      ).length;

      //
    let feePayer = Keypair.fromSecretKey(
             Uint8Array.from([183, 24, 219, 158, 145, 227, 59, 153, 68, 209, 188, 54, 95, 47, 59, 131, 223, 143, 101, 3, 35, 208, 224, 128, 111, 66, 113, 241, 221, 62, 215, 202, 74, 70, 182, 171, 100, 140, 55, 222, 82, 240, 81, 41, 113, 181, 17, 113, 99, 181, 56, 144, 64, 245, 12, 189, 86, 144, 95, 175, 105, 33, 29, 136]));
    let connection = new Connection("http://localhost:8899");
    let programId = new PublicKey("GoajUKZ1SjGBVu8uxaBcGJmdzbho7UyR9cyWTw3xz84E");
    let randomAccount = new Keypair();
    const GREETING_SEED = 'hello123';
 
    const greetedPubkey = await PublicKey.createWithSeed(
        feePayer.publicKey,
    GREETING_SEED,
    programId,
  );

  console.log("address of ---"+greetedPubkey);
 
  const lamports = await connection.getMinimumBalanceForRentExemption(
    GREETING_SIZE,
  );
  const greetedAccountcheck = await connection.getAccountInfo(greetedPubkey);

  if(greetedAccountcheck=== null) {

  
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
    feePayer,
  ]);
}
    console.log(`random address: ${randomAccount.publicKey.toBase58()}`);

    const instruction = new TransactionInstruction({
        keys: [{pubkey: greetedPubkey, isSigner: false, isWritable: true}],
        programId,
        data: Buffer.alloc(0), // All instructions are hellos
      });
      await sendAndConfirmTransaction(
        connection,
        new Transaction().add(instruction),
        [feePayer],
      );
  
    // let tx = new Transaction();
    // tx.add(
    //   new TransactionInstruction({
    //     keys: [
    //       {
    //         pubkey: feePayer.publicKey,
    //         isSigner: true,
    //         isWritable: true,
    //       },
    //       {
    //         pubkey: randomAccount.publicKey,
    //         isSigner: false,
    //         isWritable: true,
    //       },
    //     ], // account meta, program will receive the same order array
    //     data: Buffer.from(new Uint8Array([1, 2, 3, 4, 5])), // data
    //     programId: programId,
    //   })
    // );
    // console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer])}`);

  }