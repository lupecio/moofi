import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";

export function getSystemKeypair() {
  const seed = bip39.mnemonicToSeedSync(
    process.env.WALLET_SEED_PHRASE,
    process.env.WALLET_SECRET
  );

  return Keypair.fromSeed(seed.subarray(0, 32));
}

export function getUserKeypair(index: bigint) {
  const seed = bip39.mnemonicToSeedSync(
    process.env.WALLET_SEED_PHRASE,
    process.env.WALLET_SECRET
  );
  const derivedSeed = derivePath(
    `m/44'/501'/${index}'/0'`,
    seed.toString("hex")
  ).key;

  return Keypair.fromSeed(derivedSeed);
}
