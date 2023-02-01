const Web3 = require('web3');
const MyContract = require('./build/contracts/MyContract.json');

const init = async () => {
    const web3 = new Web3('http://localhost:8545');

    const id = await web3.eth.net.getId();
    const deployedNetwork = MyContract.networks[id];
    const contract = new web3.eth.Contract(
        MyContract.abi,
        deployedNetwork.address
    );
    const addresses = await web3.eth.getAccounts();
    await contract.methods.register('doctor1','123456').send({
            from: addresses[0],
    });
    const denglujieguo=await contract.methods.login('doctor1','123456').send({
           from: addresses[0],
    });
    // console.log(denglujieguo);
    //const addresses = await web3.eth.getAccounts();
    //await contract.methods.setData(10).send({
    //    from: addresses[0],
    //});

    const jiayi=await contract.methods.Addnewpatient('12','a','f').send({
               from: addresses[0],
               gas: 1000000,
         });
    console.log(jiayi);

    const data = await contract.methods.Searchpatient('12').send({
                   from: addresses[0],
              });
    console.log(data);
    //const data = await contract.methods.getData().call();
    //console.log(data);

}

init();
