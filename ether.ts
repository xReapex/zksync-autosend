import { Wallet, Provider, types } from "zksync-ethers";
import { ethers } from "ethers";
import * as config from './config.json';

const provider = Provider.getDefaultProvider(types.Network.Mainnet);
const wallet = new Wallet(config.PRIVATE_KEY, provider);
 
async function l2transfer() {

    // ETH
    const transferHandle = await wallet.transfer({
      to: config.destAddress,
      amount: ethers.utils.parseEther((parseFloat(ethers.utils.formatUnits(await wallet.getBalance())) - 0.001).toFixed(4)),
    });
    
    const tx = await transferHandle.wait();
    
    console.log(`Transferred to ${tx.to} \nTx hash: ${tx.transactionHash}`);
}

const timeout = setInterval(async () => {
    // Check if more or equal than X value in ETH
    if (ethers.utils.formatUnits(await wallet.getBalance()) >= '0.006') // threshold in ETH
        {
            clearInterval(timeout);
            l2transfer();
        }
}, 100)