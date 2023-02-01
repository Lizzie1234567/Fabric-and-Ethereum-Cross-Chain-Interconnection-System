# Fabric-and-Ethereum-Cross-Chain-Interconnection-System
Hyperledger Fabric and Ethereum Cross-Chain Interconnection System: Health Record System

Electronic health record system has become more and more essential in medical system. 
However, in current health record systems there exists many drawbacks. For example, because 
of its centralization, patient info can be modified easily, and the interaction between different 
hospitals is hardly to implement. After analysis, we find Ethereum and Hyperledger Fabric are 
suitable to solve these problems, as the decentralized ways provide numerous advantages, such 
as transparency, availability and integrity. In this report, we will implement the Dapp on both 
two platforms and the interaction between them

When realizing the cross-chain communication interaction between Ethereum and 
Hyperledger Fabric, the specific interaction in this application is only implemented on one node, 
which may actually cause risks. The first is the integrity of the interactive node. The integrity 
node has all reasonable access rights to the Ethereum smart contract. Although he still cannot 
modify the information deployed on the chain, he can establish an account on the premise. 
Wrong information is written in the Ethereum smart contract and returned to the Hyperledger 
Fabric. The way to prevent it is that although malicious exchange nodes may tamper, the 
relevant records and modified pseudonyms will be stored in the blockchain. Once the Ethereum 
pseudonym and hyper ledger node identity are matched, this risk can be eliminated. Take 
precautions.

The second problem is that our application greatly limits the access of the Ethereum smart 
contract to the Hyperledger Fabric, because it is relatively dangerous to provide access to the 
address of the Ethereum smart contract, because in many cases, these addresses are very It is 
difficult to be tracked, so this article does not implement it. But in the prospect section, we also 
hope to propose a feasible solution to achieve reverse access. First, establish limited access 
rights. Set up a user set on the Hyperledger Fabric side to strictly control access. This user group 
can only access, not Take any other action. The second method is to refer to the method of the 
relay chain to carry out relay communication of multiple nodes, which can have Byzantine 
tolerance. The third method is a feasible method proposed by IBM, which is to strip the abi of 
Ethereum and deploy it on the Hyperledger Fabric, so that the node actually conforms to the 
consensus of the Hyperledger Fabric, thereby realizing safe communication.
