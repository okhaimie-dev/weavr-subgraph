# the-frabric-subgraph

##

To generate abis file, compile original hardhat project file and move artifacts/contract file to abis/ in the-frabric-subgraph

## To Build

run the following graph commands:

```
npm install
graph codegen
graph build
graph deploy fractional-finance/frabric-subgraph --ipfs https://api.thegraph.com/ipfs/ --node https://api.thegraph.com/deploy/ --access-token <ACCESS_TOKEN>
```
