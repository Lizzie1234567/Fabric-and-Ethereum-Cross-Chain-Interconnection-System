var express = require('express');
var router = express.Router();
const FabricClient = require('../fabric/client.js');
const client = new FabricClient();
const Web3 = require('web3');
const MyContract = require('./build/contracts/MyContract.json');

const init = async () => {
    const web3 = new Web3('http://localhost:8545');

    const id = await web3.eth.net.getId();
    const deployedNetwork = MyContract.networks[id];
    console.log(deployedNetwork)
    const contract = new web3.eth.Contract(
        MyContract.abi,
        deployedNetwork.address
    );
    const addresses = await web3.eth.getAccounts();
    const data = await contract.methods.Searchpatient('wanghaoyu').send({
    from: addresses[0],
});
}
/* GET home page. */
// Task 5

router.get('/', function(req, res, next) {
  var productRequest = new Promise((resolve, reject) => {
    if (req.query.search){
      console.log(req.query.search)
      var products = client.query('admin', 'SearchProducts', [req.query.search]);

    } else if (req.query.filter){
      // TAsk 8
      var products = client.query('admin', 'GetIncompleteProducts');
    } else{
      var products = client.query('admin', 'QueryAllProducts');
    }
    resolve(products);
  });
  var userRequest = new Promise((resolve, reject)=>{
    var users = client.listUsers();
    resolve(users);
  })
  //
  // var solRequest = new Promise((resolve, reject)=>{
  //
  //     console.log("start here");
  //   if (req.query.search){
  //       console.log("end here");
  //     console.log(req.query.search)
  //     const addresses = web3.eth.getAccounts();
  //     sol_data =  contract.methods.Searchpatient(req.query.search).send({
  //                  from: addresses[0],
  //             });
  //
  //   console.log(sol_data);
  //   resolve(sol_data);
  //   }
  //   else{
  //     sol_data = 0;
  //     resolve(sol_data);
  //   }
  // })


  Promise.all([productRequest, userRequest]).then((data) => {
    console.log("resolved");
    console.log(data);
    // res.render('index', { title: 'Health record System', products: data[0], users: data[1], sol_res:data[2],filter: req.query.filter, search: req.query.search });
    //
    res.render('index', { title: 'Health record System', products: data[0], users: data[1], filter: req.query.filter, search: req.query.search });
    //
  })
});
init();
module.exports = router;
