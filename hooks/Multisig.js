import { ethers, Wallet, Contract } from "ethers";
import SupabaseInterface from "./Supabase";

import SafeProxyJson from "../multisig/safe-proxy.json";

const RINKEBY_RPC_PROVIDER =
  "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

export default Safe = (userInfo, roomId) => {
  const { saveTransactionHash, saveMultiSigWalletAddress } =
    SupabaseInterface();

  const provider = new ethers.providers.JsonRpcProvider(RINKEBY_RPC_PROVIDER);
  const signerAccount = new Wallet(userInfo?.privKey, provider);
  const publicAddress = signerAccount.address;
  const BYTES_DATA = `0xb63e800d0000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000f48f2b2d2a534e402487b3ee7c18c33aec0fe5e40000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000${publicAddress.slice(
    2
  )}0000000000000000000000000000000000000000000000000000000000000000`;

  const contract = new Contract(
    SafeProxyJson.networkAddresses["4"],
    SafeProxyJson.abi,
    signerAccount
  );

  const createProxy = async () => {
    const execute = await contract.createProxy(
      SafeProxyJson.singletonAddress,
      BYTES_DATA
    );
    const txnHash = execute.hash;
    // save the txnHash JUST IN CASE
    saveTransactionHash(txnHash, roomId);

    let receipt = await provider.getTransactionReceipt(txnHash);

    // force retrieve the receipt rather than adding event listening (for now)
    while (!receipt) {
      receipt = await provider.getTransactionReceipt(txnHash);
    }

    // save this address, this is now our multisig wallet
    saveMultiSigWalletAddress(receipt.logs[0].address, txnHash);

    return receipt.logs[0].address;
  };

  return { createProxy };
};
