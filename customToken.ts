import { Wallet, Provider, types } from "zksync-ethers";
import * as config from './config.json';

const provider = Provider.getDefaultProvider(types.Network.Mainnet);
const wallet = new Wallet(config.PRIVATE_KEY, provider);
 
const tokenAddress = "0x493257fd37edb34451f62edf8d2a0c418852ba4c" // USDT
async function l2transfer() {

    // Transfer tokenAddress
    const transferHandle = await wallet.transfer({
        to: config.destAddress,
        token: tokenAddress,
        amount: await wallet.getBalance(tokenAddress),
    });
    
    const tx = await transferHandle.wait();
    
    console.log(`Transferred to ${tx.to} \nTx hash: ${tx.transactionHash}`);
}

const timeout = setInterval(async () => {
    // Check if more or equal than token in specific token
    if ( (Number(await wallet.getBalance(tokenAddress))/1000000) >= 5) // threshold in token
        {
            l2transfer();
            clearInterval(timeout);
        }
}, 100)