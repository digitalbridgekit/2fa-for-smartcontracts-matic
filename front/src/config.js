export const CONTRACT_ADDRESS = '0xB6B97A210A2f76CE7643E680124bAf99Add001b8' // Contract address

export const ABI = [
    {
	"constant": false,
	"inputs": [
	    {
		"name": "_requestId",
		"type": "bytes32"
	    },
	    {
		"name": "_allowed",
		"type": "bool"
	    }
	],
	"name": "fulfillGAPINCheck",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
    },
    {
	"constant": false,
	"inputs": [],
	"name": "renounceOwnership",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
    },
    {
	"constant": false,
	"inputs": [
	    {
		"name": "_customerId",
		"type": "string"
	    },
	    {
		"name": "_pin",
		"type": "string"
	    }
	],
	"name": "requestGAPINCheck",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
    },
    {
	"anonymous": false,
	"inputs": [
	    {
		"indexed": true,
		"name": "requestId",
		"type": "bytes32"
	    },
	    {
		"indexed": true,
		"name": "allowed",
		"type": "bool"
	    }
	],
	"name": "RequestGAPINCheckFulfilled",
	"type": "event"
    },
    {
	"anonymous": false,
	"inputs": [
	    {
		"indexed": true,
		"name": "previousOwner",
		"type": "address"
	    }
	],
	"name": "OwnershipRenounced",
	"type": "event"
    },
    {
	"anonymous": false,
	"inputs": [
	    {
		"indexed": true,
		"name": "previousOwner",
		"type": "address"
	    },
	    {
		"indexed": true,
		"name": "newOwner",
		"type": "address"
	    }
	],
	"name": "OwnershipTransferred",
	"type": "event"
    },
    {
	"anonymous": false,
	"inputs": [
	    {
		"indexed": true,
		"name": "id",
		"type": "bytes32"
	    }
	],
	"name": "ChainlinkRequested",
	"type": "event"
    },
    {
	"anonymous": false,
	"inputs": [
	    {
		"indexed": true,
		"name": "id",
		"type": "bytes32"
	    }
	],
	"name": "ChainlinkFulfilled",
	"type": "event"
    },
    {
	"anonymous": false,
	"inputs": [
	    {
		"indexed": true,
		"name": "id",
		"type": "bytes32"
	    }
	],
	"name": "ChainlinkCancelled",
	"type": "event"
    },
    {
	"constant": false,
	"inputs": [
	    {
		"name": "_newOwner",
		"type": "address"
	    }
	],
	"name": "transferOwnership",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
    },
    {
	"inputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "constructor"
    },
    {
	"constant": false,
	"inputs": [],
	"name": "withdrawLink",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
    },
    {
	"constant": true,
	"inputs": [],
	"name": "currentPermission",
	"outputs": [
	    {
		"name": "",
		"type": "bool"
	    }
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
    },
    {
	"constant": true,
	"inputs": [],
	"name": "getChainlinkToken",
	"outputs": [
	    {
		"name": "",
		"type": "address"
	    }
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
    },
    {
	"constant": true,
	"inputs": [],
	"name": "owner",
	"outputs": [
	    {
		"name": "",
		"type": "address"
	    }
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
    }
]
