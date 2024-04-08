import {
  DataV2,
  PROGRAM_ID,
  createCreateMetadataAccountV3Instruction,
  createSignMetadataInstruction,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionSignature,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintToChecked,
} from "@solana/spl-token";
import * as bs58 from "bs58";
import { getUserKeypair, getSystemKeypair } from "./keypair";
import { retryAsync } from "ts-retry";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const systemKeypair = getSystemKeypair();

async function getMetadataPDA(mint: PublicKey): Promise<PublicKey> {
  const [publicKey] = await PublicKey.findProgramAddress(
    [Buffer.from("metadata"), PROGRAM_ID.toBuffer(), mint.toBuffer()],
    PROGRAM_ID
  );

  return publicKey;
}

export async function createToken() {
  const systemKeypair = getSystemKeypair();

  const mint = await createMint(
    connection,
    systemKeypair,
    systemKeypair.publicKey,
    systemKeypair.publicKey,
    8
  );

  const metadataData: DataV2 = {
    name: "MILK",
    symbol: "$MILK",
    uri: "https://arweave.net/O2R_B2HyibeGl1N3IljEd0Io8QUv04yGPQJHIilI6vk",
    creators: [
      {
        address: systemKeypair.publicKey,
        share: 100,
        verified: true,
      },
    ],
    sellerFeeBasisPoints: 0,
    collection: null,
    uses: null,
  };
  const tokenMetadataPubkey = await getMetadataPDA(mint);

  const transaction = new Transaction()
    .add(
      createCreateMetadataAccountV3Instruction(
        {
          payer: systemKeypair.publicKey,
          metadata: tokenMetadataPubkey,
          updateAuthority: systemKeypair.publicKey,
          mint,
          mintAuthority: systemKeypair.publicKey,
        },
        {
          createMetadataAccountArgsV3: {
            data: metadataData,
            isMutable: true,
            collectionDetails: null,
          },
        }
      )
    )
    .add(
      createSignMetadataInstruction({
        creator: systemKeypair.publicKey,
        metadata: tokenMetadataPubkey,
      })
    );
  const createMetadataSignature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [systemKeypair, systemKeypair]
  );

  return mint;
}

export async function mintToken(
  amount: number,
  userId: bigint,
  tokenPubkey: PublicKey
) {
  const cowKeypair = getUserKeypair(userId);
  const cowTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    systemKeypair,
    tokenPubkey,
    cowKeypair.publicKey
  );

  let txhash = await mintToChecked(
    connection, // connection
    systemKeypair, // fee payer
    tokenPubkey, // mint
    cowTokenAccount.address, // receiver (sholud be a token account)
    systemKeypair, // mint authority
    Number(`${amount}e8`), // amount. if your decimals is 8, you mint 10^8 for 1 token.
    8 // decimals
  );
  console.log(`txhash: ${txhash}`);

  return txhash;
}
