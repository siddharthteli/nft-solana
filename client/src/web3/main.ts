import { Keypair, Transaction, Connection, TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js";

// remember to check your fee payer has enough SOL to send tx

// 5zwi8GthH6vj3u7uQg9dTsbKSsaeVvseC4nwPLjD4eTy
let feePayer = Keypair.fromSecretKey(
    Uint8Array.from([183, 24, 219, 158, 145, 227, 59, 153, 68, 209, 188, 54, 95, 47, 59, 131, 223, 143, 101, 3, 35, 208, 224, 128, 111, 66, 113, 241, 221, 62, 215, 202, 74, 70, 182, 171, 100, 140, 55, 222, 82, 240, 81, 41, 113, 181, 17, 113, 99, 181, 56, 144, 64, 245, 12, 189, 86, 144, 95, 175, 105, 33, 29, 136])
);

// your program
let programId = new PublicKey("GoajUKZ1SjGBVu8uxaBcGJmdzbho7UyR9cyWTw3xz84E");

export  async function main() {
    let connection = new Connection("http://localhost:8899");
    let randomAccount = new Keypair();
    console.log(`random address: ${randomAccount.publicKey.toBase58()}`);
    let tx = new Transaction();
    tx.add(
        new TransactionInstruction({
            keys: [
                {
                    pubkey: feePayer.publicKey,
                    isSigner: true,
                    isWritable: true,
                },
                {
                    pubkey: randomAccount.publicKey,
                    isSigner: false,
                    isWritable: true,
                },
            ], // account meta, program will receive the same order array
            data: Buffer.from(new Uint8Array([1, 2, 3, 4, 5])), // data
            programId: programId,
        })
    );
    console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer])}`);
    // after you sending, you can check tx on official explorer
    // it should log these data which we pass into tx.
    // in next chapter I'm going to tell you how to make branch to your program
}

main().then(
    () => process.exit?.(-1),
    (err) => {
        console.error(err);
    }
);