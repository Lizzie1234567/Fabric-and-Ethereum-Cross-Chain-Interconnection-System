/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');

let args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Invalid number of arguments, expecting 2.\nUsage: registerUser.js [name] [user-type]');
    process.exit(1);
}
let username = args[0];
let role = args[1].toLowerCase();

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get(username);
        if (userIdentity) {
            console.log(`An identity for the user \"${username}\" already exists in the wallet`);
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // Set the attributes based on the role
        let attrs = [{name: 'username', value: username, ecert: true}];
        let attr_reqs = [{name: 'username', optional: true}];
        switch(role) {
          case 'creator':
              attrs.push({name: 'canCreate', value: 'true', ecert: true});
              attr_reqs.push({name: 'canCreate', optional: true});
              break;
          // Task 1 Add a manager case
          case 'manager':
              let stage = 0;
              if (args.length < 3) {
                  stage = '3';
              } else{
                  stage = args[2];
              }
              attrs.push({name: 'canSignProduct', value: stage, ecert: true});
              attr_reqs.push({name: 'canSignProduct', optional: true});
              break;
          default:
              console.error('Unexpected role');
              process.exit(1);
        }

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: username,
            role: 'client',
            attrs:attrs
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: username,
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put(username, x509Identity);
        console.log(`Successfully registered and enrolled user \"${username}\" and imported it into the wallet`);

    } catch (error) {
        console.error(`Failed to register user \"${username}\": ${error}`);
        process.exit(1);
    }
}

main();
