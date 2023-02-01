const Web3 = require('web3');
const MyContract = require('./build/contracts/MyContract.json');

const init = async () => {
    const web3 = new Web3('http://localhost:7545');

    const id = await web3.eth.net.getId();
    const deployedNetwork = MyContract.networks[id];
    const contract = new web3.eth.Contract(
        MyContract.abi,
        deployedNetwork.address
    );
    const addresses = await web3.eth.getAccounts();
    //register
    // await contract.methods.register('doctor1','123456').send({
    //         from: addresses[0],
    // });
    //login
    const denglujieguo=await contract.methods.login('doctor1','123456').send({
           from: addresses[0],
    });

    //Addnewpatient
    const jiayi=await contract.methods.Addnewpatient('pat-s','pat','fever').send({
               from: addresses[0],
               gas: 1000000,
         });
    console.log(jiayi);
    //Searchpatient
    const data = await contract.methods.Searchpatient('pat-s').send({
                   from: addresses[0],
              });
    console.log(data);

    
}

init();