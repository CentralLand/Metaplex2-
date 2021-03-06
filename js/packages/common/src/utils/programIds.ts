import { PublicKey } from '@solana/web3.js';
import { findProgramAddress } from '../utils';

import {
  METADATA_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
  METAPLEX_ID,
  BPF_UPGRADE_LOADER_ID,
  SYSTEM,
  MEMO_ID,
  VAULT_ID,
  AUCTION_ID,
} from './ids';

export const ENABLE_FEES_INPUT = false;

// legacy pools are used to show users contributions in those pools to allow for withdrawals of funds
export const PROGRAM_IDS = [
  {
    name: 'mainnet-beta',
  },
  {
    name: 'testnet',
  },

  {
    name: 'devnet',
  },
  {
    name: 'localnet',
  },
];

let STORE_OWNER_ADDRESS: PublicKey | undefined;

export const setStoreID = (storeId: any) => {
  STORE_OWNER_ADDRESS = storeId
    ? new PublicKey(`${storeId}`)
    : // DEFAULT STORE FRONT OWNER FOR METAPLEX
      undefined;
};

const getStoreID = async () => {
  console.log(`STORE_OWNER_ADDRESS: ${STORE_OWNER_ADDRESS?.toBase58()}`);
  if (!STORE_OWNER_ADDRESS) {
    return undefined;
  }

  const programs = await findProgramAddress(
    [
      Buffer.from('metaplex'),
      METAPLEX_ID.toBuffer(),
      STORE_OWNER_ADDRESS.toBuffer(),
    ],
    METAPLEX_ID,
  );
  const CUSTOM = programs[0];
  console.log(`CUSTOM STORE: ${CUSTOM.toBase58()}`);

  return CUSTOM;
};

export const setProgramIds = async (envName: string) => {
  let instance = PROGRAM_IDS.find(env => envName.indexOf(env.name) >= 0);
  if (!instance) {
    return;
  }

  if (!STORE) {
    STORE = await getStoreID();
  }
};

let STORE: PublicKey | undefined;

export const programIds = () => {
  return {
    token: TOKEN_PROGRAM_ID,
    associatedToken: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    bpf_upgrade_loader: BPF_UPGRADE_LOADER_ID,
    system: SYSTEM,
    metadata: METADATA_PROGRAM_ID,
    memo: MEMO_ID,
    vault: VAULT_ID,
    auction: AUCTION_ID,
    metaplex: METAPLEX_ID,
    store: STORE,
  };
};
