# Deskchange

This is a beginner front-end based solidity dapp that lets you connect to a metamask wallet and transact tokens. 

## Description

This contract is built using the following :

- Next.js
- Solidity
- Hardhat

Using these, this app lets you deploy a solidity smart contract locally which you can interact with using a front end built on next.js.

The app showcases a modern UI and improved functionality and is based on the starter project [SCM-Starter](https://github.com/MetacrafterChris/SCM-Starter).


## Getting Started

### Executing program

First of all you need to clone this github repository to your machine. After cloning the repo, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

   
After this, the project will be running on your localhost. Typically at http://localhost:3000/

## Help

Make sure to connect your metamask wallet to the owner account of your deployed hardhat node.

## Authors

  
[Dunking](https://twitter.com/dunkjn3022)


## License

This project is licensed under the MIT License - see the LICENSE.md file for details
