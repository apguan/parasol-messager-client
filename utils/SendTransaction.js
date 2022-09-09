import { RINKEBY_RPC_PROVIDER } from "@env";
import { ethers, Wallet } from "ethers";

export default Transact = (userInfo) => {
  const provider = new ethers.providers.JsonRpcProvider(RINKEBY_RPC_PROVIDER);
  const signerAccount = new Wallet(userInfo?.privKey, provider);

  const sendEth = async (amount, receiverAddress) => {
    // Create a transaction object
    const txnObj = {
      to: receiverAddress,
      value: ethers.utils.parseEther(amount),
    };

    const result = await wallet.sendTransaction(txnObj);
    const txnHash = result.hash;

    let receipt = await provider.getTransactionReceipt(txnHash);

    // force retrieve the receipt rather than adding event listening (for now)
    while (!receipt) {
      receipt = await provider.getTransactionReceipt(txnHash);
    }

    return receipt.logs[0].address;
  };

  return { sendEth };
};
