export const addresses = {
  SP1Verifier: "0x79052214591e45D1dfcC9AcAaf9f2dC853410Fe1",
  SukukToken: "0xdf80e7e8dE2C8A15959009A51D052aEE9554875d",
  ZKSukukGate: "0xbE3EE75542E52879A451C38b7474706E367941cd",
  SukukDistributor: "0xc577F43f0Aa7595F680e1986F077253Da24c3F23"
} as const;

export const abis = {
  ZKSukukGate: [
    {
      "type": "function",
      "name": "verifyAndAuthorize",
      "inputs": [
        {"name": "investor", "type": "address"},
        {"name": "proof", "type": "bytes"},
        {"name": "publicValues", "type": "bytes"}
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    }
  ],
  SukukDistributor: [
    {
      "type": "function",
      "name": "claimableYield",
      "inputs": [{"name": "investor", "type": "address"}],
      "outputs": [{"name": "", "type": "uint256"}],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "claimYield",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    }
  ],
  SukukToken: [
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [{"name": "account", "type": "address"}],
      "outputs": [{"name": "", "type": "uint256"}],
      "stateMutability": "view"
    }
  ]
} as const;
