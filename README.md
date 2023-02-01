# Fabric-and-Ethereum-Cross-Chain-Interconnection-System
Hyperledger Fabric and Ethereum Cross-Chain Interconnection System: Health Record System

Electronic health record system has become more and more essential in medical system. 
However, in current health record systems there exists many drawbacks. For example, because 
of its centralization, patient info can be modified easily, and the interaction between different 
hospitals is hardly to implement. After analysis, we find Ethereum and Hyperledger Fabric are 
suitable to solve these problems, as the decentralized ways provide numerous advantages, such 
as transparency, availability and integrity. In this report, we will implement the Dapp on both 
two platforms and the interaction between them.

With the continuous development of society, electronic health records are more and more 
widely used in the medical system. But the current electronic health record system is centralized, 
and the data of patients in many hospitals are not interoperable. This has led to many drawbacks 
in the current medical system.

As of today, critical patient data, case and test information were still scattered among 
different medical institutions. Due to the inefficiencies of the current system, critical data 
cannot be accessed or obtained when needed. At the same time, the systems of many medical 
institutions are not complete, and the data management of most medical institutions is still very 
difficult, which makes the personal data management process difficult.

Nowadays since the electronic health records are stored centrally on the hospital's server, 
the system administrator can unconditionally modify any patient information, and we cannot 
trace back to the person who modified the patient information. Therefore, it cannot be ruled out 
that some immoral doctors maliciously modify patient information for their own benefit. In fact, 
due to the huge amount of electronic medical record data, the hospital will delete some patient 
information from time to time, so there are often cases where some patients' condition records 
are not perfect, which affects the doctor's diagnosis of the patient's condition.

Therefore, we decided to apply blockchain technology to electronic health records to 
design a decentralized health record system that can protect the integrity of patient information 
and data from malicious tampering, and it can trace the patient's attending doctor. The 
requirements are as follows:

⚫ Patient information, such as id, description, etc. can be recorded in detail.

⚫ Patient information cannot be modified maliciously.

⚫ Doctors can add, delete, modify and check four main functions of medical records.

⚫ Doctors can use the system only after logging in.

⚫ Different doctors have different permissions, and only the attending doctor can change 
the patient information.

⚫ When the search information is incomplete, relevant information can also be searched.

⚫ Ensure that doctors are responsible for patients, and if there is a problem with the 
medical records, the attending doctor can be accurately identified.

⚫ For hospitals that use Dapps on different platforms (Ethereum or Hyperledger Fabric), 
data can still be shared.


When realizing the cross-chain communication interaction between Ethereum and 
Hyperledger Fabric, the specific interaction in this application is only implemented on one node, 
which may actually cause risks. 

The first is the integrity of the interactive node. The integrity 
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
can only access, not Take any other action. 

The second method is to refer to the method of the 
relay chain to carry out relay communication of multiple nodes, which can have Byzantine 
tolerance. The third method is a feasible method proposed by IBM, which is to strip the abi of 
Ethereum and deploy it on the Hyperledger Fabric, so that the node actually conforms to the 
consensus of the Hyperledger Fabric, thereby realizing safe communication.


*⚫Environmental requirements:

ganache-cli/image, node.js, npm, truffle, Web3

*⚫Ethereum smart contract part:

truffle compile

compile

2_deploy_migration.js has been modified and added to the folder

connect ganache

truffle migrate

Execute index.js to realize addition, deletion, modification and query

*⚫Hyperledger part:

Go language compiles chaincode

Run startfabric.sh to connect to hyperledger

Create admin, creator, manager and other nodes

Call index.js and other files through the web page to perform additions, deletions, changes, and queries

*⚫File location:

chaincode:
Training/fabric-samples/chaincode

Javascript:
Training/fabric-samples/fabcomp/Javascript

*⚫Interactive part:

Redeploy the smart contract under the route folder. According to the above method, the same web3 dependencies should also be installed in this folder

add patient pat-s

start hyperledger network

add patient pat-h

After connecting to the webpage, you can find that the connection has been realized

Search the name of the patient that needs to be searched on Ethereum in the search bar

After the query is added to hyperledger

Pat-s for the ethereum part can be found on the frontend
