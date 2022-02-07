const Web3 = require('web3');
const EthereumEventProcessor = require('ethereum-event-processor');


const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com'));
const tokenABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "today",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "counter",
				"type": "uint256"
			}
		],
		"name": "LogTest",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "increment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const contract = '0x4d87951240A0aeFeD80a717A403b48622ab6F65F'
async function start() {

	const latest = await web3.eth.getBlockNumber()
	console.log(latest);
	const blockSize = 10;
	const interval = 1000 //millisecond = 1second

	const options = {
		startBlock: latest,
		pollingInterval: interval,
		blocksToWait: blockSize,
		blocksToRead: blockSize
	};
	const eventProcessor = new EthereumEventProcessor(web3, contract, tokenABI, options);

	eventProcessor.on('LogTest', (event) => {
	  console.log(event);
	});

	eventProcessor.on('end', (fromBlock, lastBlock) => {
	  console.log(fromBlock, lastBlock); 
	});
	eventProcessor.listen();

}

start();


// eventProcessor.stop();





