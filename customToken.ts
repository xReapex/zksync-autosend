import { Wallet, Provider, utils, types } from "zksync-ethers";
import * as config from './config.json';
import * as ethers from "ethers";

const provider = Provider.getDefaultProvider(types.Network.Mainnet);
const wallet = new Wallet(config.PRIVATE_KEY, provider);
 
async function l2transfer() {

    // Transfer USDT
    const transferHandle = await wallet.transfer({
        to: config.destAddress,
        token: '0x493257fd37edb34451f62edf8d2a0c418852ba4c',
        amount: await wallet.getBalance('0x493257fd37edb34451f62edf8d2a0c418852ba4c'),
    });
    
    const tx = await transferHandle.wait();
    
    console.log(`Transferred to ${tx.to} \nTx hash: ${tx.hash}`);
}

l2transfer();


const timeout = setInterval(async () => {
    // Check if more or equal than X value in ETH
    ethers.BigNumber.from()
    console.log(await wallet.getBalance('0x493257fd37edb34451f62edf8d2a0c418852ba4c'))
    /*if (await wallet.getBalance('0x493257fd37edb34451f62edf8d2a0c418852ba4c') >= '0.006') 
        {
            l2transfer();
            clearInterval(timeout);
        }*/
}, 100)