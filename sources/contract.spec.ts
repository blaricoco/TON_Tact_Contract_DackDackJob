import { toNano, fromNano } from "ton";
import { ContractSystem } from "ton-emulator";
import { JobContract } from "./output/sample_JobContract";

describe("contract", () => {

  it("Fund_Project - CHECK STATUS UNFUNDED - Project Created", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain 
    let owner = system.treasure("owner"); // Creates wallet (owner)
    let contract = system.open(await JobContract.fromInit(owner.address)); // Open contract - using contract 
    await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getFunds()).toEqual(0n); // Deploy start state 

    // Increment counter
    let currentStatus = await contract.getContractStatus();
    await system.run();

    // Check counter
    expect(currentStatus).toEqual(0n);

  });

  it("Fund_Project - CHECK STATUS FUNDED - should not allow funding", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain 
    let owner = system.treasure("owner"); // Creates wallet (owner)
    let contract = system.open(await JobContract.fromInit(owner.address)); // Open contract - using contract 
    await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getFunds()).toEqual(0n); // Deploy start state 

    await contract.send(owner, { value: toNano(1) },  { $$type: "Update_Status", statusID: 1n });
    await contract.send(owner, { value: toNano(1) },  { $$type: "Fund_Project", amount: 1n });
    
    await contract.send(owner, { value: toNano(1) },  { $$type: "Update_Status", statusID: 3n });
    await contract.send(owner, { value: toNano(1) },  { $$type: "Fund_Project", amount: 1n });
    
    await contract.send(owner, { value: toNano(1) },  { $$type: "Update_Status", statusID: 4n });
    await contract.send(owner, { value: toNano(1) },  { $$type: "Fund_Project", amount: 1n });
    
    await contract.send(owner, { value: toNano(1) },  { $$type: "Update_Status", statusID: 4n });
    await contract.send(owner, { value: toNano(1) },  { $$type: "Fund_Project", amount: 1n });

    await contract.send(owner, { value: toNano(1) },  { $$type: "Update_Status", statusID: 5n });
    await contract.send(owner, { value: toNano(1) },  { $$type: "Fund_Project", amount: 1n });

    await contract.send(owner, { value: toNano(1) },  { $$type: "Update_Status", statusID: 6n });
    await contract.send(owner, { value: toNano(1) },  { $$type: "Fund_Project", amount: 1n });
   
    
    await system.run();

    // Check counter
    expect(await contract.getFunds()).toEqual(0n);

  });

  it("Fund_Project - CHECK STATUS INVALID - Should allow funding", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain 
    let owner = system.treasure("owner"); // Creates wallet (owner)
    let contract = system.open(await JobContract.fromInit(owner.address)); // Open contract - using contract 
    await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getFunds()).toEqual(0n); // Deploy start state 

    await contract.send(owner, { value: toNano(1) },  { $$type: "Update_Status", statusID: 8n });
    await contract.send(owner, { value: toNano(1) },  { $$type: "Fund_Project", amount: 250n });
    
    await system.run();

    // Check counter
    expect(await contract.getFunds()).toEqual(250n);

  });

  it("Fund_Project - CHECK GETTERS - getGetContractStatus ", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain 
    let owner = system.treasure("owner"); // Creates wallet (owner)
    let contract = system.open(await JobContract.fromInit(owner.address)); // Open contract - using contract 
    await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getFunds()).toEqual(0n); // Deploy start state 

    await contract.send(owner, { value: toNano(1) },  { $$type: "Update_Status", statusID: 2n });
    await system.run();

    let currentStatus = await contract.getContractStatus();

    // Check counter
    expect(currentStatus).toEqual(2n);

  });

  it("Fund_Project - CHECK GETTERS - getDeployedTime ", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain 
    let owner = system.treasure("owner"); // Creates wallet (owner)
    let contract = system.open(await JobContract.fromInit(owner.address)); // Open contract - using contract 
    await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getFunds()).toEqual(0n); // Deploy start state 

    await system.run();

    // Get contract date 
    let deployedTime = await contract.getDeployedTime();
    var date = new Date(Number(deployedTime) * 1000);
    var day = date.getDay();

    // Get todays date
    var today = new Date();

    // Todays day should be equal to contract deployed day
    expect(day).toEqual(today.getDay());

  });

  it("Fund_Project - CHECK GETTERS - getMaxTimeToDeposit ", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain 
    let owner = system.treasure("owner"); // Creates wallet (owner)
    let contract = system.open(await JobContract.fromInit(owner.address)); // Open contract - using contract 
    await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getFunds()).toEqual(0n); // Deploy start state 

    await system.run();

    let deployedTime = await contract.getDeployedTime();

    // Get contract date 
    let maxTimeToDeposit = await contract.getMaxTimeToDeposit();
    var dateDeposit = new Date(Number(deployedTime - maxTimeToDeposit) * 1000);

    console.log(dateDeposit);
   
    // Max time to deposit should be 259200 which translates to 3 days in seconds
    expect(Number(maxTimeToDeposit)).toEqual(259200);

  });

  // TODO: To be tested in testnet for longer period of time
  it("Fund_Project - CHECK - Max time to deposit exceeded ", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain 
    let owner = system.treasure("owner"); // Creates wallet (owner)
    let contract = system.open(await JobContract.fromInit(owner.address)); // Open contract - using contract 
    await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getFunds()).toEqual(0n); // Deploy start state 
    await system.run();

    await contract.send(owner, {value: toNano(1)}, {$$type: "Fund_Project", amount: 250n})
    await system.run();
   
    // Max time to deposit should be in 3 days - allowing deposit
    expect(await contract.getFunds()).toEqual(250n);

  });

  it("Fund_Project - CHECK - Incorrect funding amount should not increase funds", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain 
    let owner = system.treasure("owner"); // Creates wallet (owner)
    let contract = system.open(await JobContract.fromInit(owner.address)); // Open contract - using contract 
    await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getFunds()).toEqual(0n); // Deploy start state 
    await system.run();

    await contract.send(owner, {value: toNano(1)}, {$$type: "Fund_Project", amount: 1n})
    await system.run();

    await contract.send(owner, {value: toNano(1)}, {$$type: "Fund_Project", amount: 10n})
    await system.run();

    await contract.send(owner, {value: toNano(1)}, {$$type: "Fund_Project", amount: 1000n})
    await system.run();

    await contract.send(owner, {value: toNano(1)}, {$$type: "Fund_Project", amount: 251n})
    await system.run();
   
    // No funding change with incorrect amount 
    expect(await contract.getFunds()).toBeLessThanOrEqual(0n);

  });
  //   it("should deploy correctly", async () => {
  //       // Create ContractSystem and deploy contract 
  //       let system = await ContractSystem.create(); //dummy blockchain 
  //       let owner = system.treasure("owner"); // Creates wallet (owner)
  //       let contract = system.open(await SampleTactContract.fromInit(owner.address)); // Open contract - using contract 
  //       await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
  //       await system.run(); // Execute
      
  //       // Check counter
  //       expect(await contract.getCounter()).toEqual(0n); // Deploy start state 

  //       // Increment counter
  //       await contract.send(owner, { value: toNano(1) }, "increment"); 
  //       await contract.send(owner, { value: toNano(1) }, "increment"); 
  //       await system.run();

  //       // Check counter
  //       expect(await contract.getCounter()).toEqual(2n);

  //   });
  //   it("Should increment by 3", async () => {
  //     // Create ContractSystem and deploy contract 
  //     let system = await ContractSystem.create(); //dummy blockchain 
  //     let owner = system.treasure("owner"); // Creates wallet (owner)
  //     let contract = system.open(await SampleTactContract.fromInit(owner.address)); // Open contract - using contract 
  //     await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
  //     await system.run(); // Execute
    
  //     // Check counter
  //     expect(await contract.getCounter()).toEqual(0n); // Deploy start state 

  //     // Increment counter
  //     await contract.send(owner, { value: toNano(3) }, {$$type: "Fund_Project", amount: 3n}); 

  //     await system.run();

  //     // Check counter
  //     expect(await contract.getCounter()).toEqual(3n);
      
  // });
  // it("Should increment by 1", async () => {
  //   // Create ContractSystem and deploy contract 
  //   let system = await ContractSystem.create(); //dummy blockchain 
  //   let owner = system.treasure("owner"); // Creates wallet (owner)
  //   let contract = system.open(await SampleTactContract.fromInit(owner.address)); // Open contract - using contract 
  //   await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
  //   await system.run(); // Execute
  
  //   // Check counter
  //   expect(await contract.getCounter()).toEqual(0n); // Deploy start state 

  //   // Increment counter
  //   await contract.send(owner, { value: toNano(1) }, "increment");
  //   await system.run();

  //   // Check counter
  //   expect(await contract.getCounter()).toEqual(1n);
    
  // });
  // it("Increment restricted by owner", async () => {
  //   // Create ContractSystem and deploy contract 
  //   let system = await ContractSystem.create(); //dummy blockchain
  //   let owner = system.treasure("owner"); // Creates wallet (owner)
  //   // Use another account to send
  //   let stranger = system.treasure("random");
  //   let contract = system.open(await SampleTactContract.fromInit(owner.address)); // Open contract - using contract 
    
  //   await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
  //   await system.run(); // Execute
  
  //   // Check counter
  //   expect(await contract.getCounter()).toEqual(0n); // Deploy start state 
    
  //   // Increment counter
  //   await contract.send(stranger, { value: toNano(1) }, "increment");
  //   await system.run();

  //   // Check counter
  //   expect(await contract.getCounter()).toEqual(0n);
    
  // });
  // it("Query contract balance", async () => {
  //   // Create ContractSystem and deploy contract 
  //   let system = await ContractSystem.create(); //dummy blockchain
  //   let owner = system.treasure("owner"); // Creates wallet (owner)
  //   let contract = system.open(await SampleTactContract.fromInit(owner.address)); // Open contract - using contract 
    
  //   // Returns balance after deployment - TBD
  //   await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
  //   await system.run(); // Execute
  
  //   // Check counter
  //   expect(await contract.getCounter()).toEqual(0n); // Deploy start state 

  //   // Get balance
  //   //console.log(await system.contract(contract.address).balance);
    
  //   // Increment counter
  //   await contract.send(owner, { value: toNano(1) }, "increment");
  //   await system.run();

  //   //console.log(await system.contract(contract.address).balance);

  //   await contract.send(owner, { value: toNano(3) }, {$$type: "Fund_Project", amount: 3n}); 
  //   await system.run();

  //   // Check counter
  //   expect(await system.contract(contract.address).balance).toBeGreaterThan(999999999n);

  // });

  // // TODO: Send half a ton back to owner - when increment 100
  // it("Send half a ton back to owner - for increment", async () => {
  //   // Create ContractSystem and deploy contract 
  //   let system = await ContractSystem.create(); //dummy blockchain
  //   let owner = system.treasure("owner"); // Creates wallet (owner)
  //   let contract = system.open(await SampleTactContract.fromInit(owner.address)); // Open contract - using contract 
    
  //   // Returns balance after deployment - TBD
  //   await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
  //   await system.run(); // Execute
  
  //   // Check counter
  //   expect(await contract.getCounter()).toEqual(0n); // Deploy start state 

  //   // Get wallet
  //   let ownerWallet = await owner.address;
  
  //   // Use wallet address and get balance

  //   console.log(fromNano( await system.contract(ownerWallet).balance));

  //   // Increment counter
  //   await contract.send(owner, { value: toNano(3) }, {$$type: "Fund_Project", amount: 3n}); 
  //   await system.run();

  //   // Check owner balance
  //   console.log(fromNano( await system.contract(ownerWallet).balance));

  //   // Check counter
  //   expect(await system.contract(contract.address).balance).toBeGreaterThan(999999999n);
    
  // });

  // // TODO: Send half a ton back to owner - when increment 100
  // it("Get deployed time", async () => {
  //   // Create ContractSystem and deploy contract 
  //   let system = await ContractSystem.create(); //dummy blockchain
  //   let owner = system.treasure("owner"); // Creates wallet (owner)
  //   let contract = system.open(await SampleTactContract.fromInit(owner.address)); // Open contract - using contract 
    
  //   // Returns balance after deployment - TBD

  //   await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
  //   await system.run(); // Execute
  
  //   // Check counter
  //   expect(await contract.getCounter()).toEqual(0n); // Deploy start state 
  //   var test = new Date
  
  //   // Check counter
  //   expect(toNano(await contract.getDeployedtime())).toBeLessThan(toNano(test.getTime()) );

  // });
});
