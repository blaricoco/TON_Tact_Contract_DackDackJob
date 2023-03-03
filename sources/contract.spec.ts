import { toNano, fromNano } from "ton";
import { ContractSystem } from "ton-emulator";
import { JobContract } from "./output/sample_JobContract";

describe("contract", () => {

  it("1) Fund_Project - CHECK STATUS UNFUNDED - Project Created", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain 
    let seller = system.treasure("seller"); // Creates wallet (seller)
    let buyer = system.treasure("buyer"); // Creates wallet (seller)
    let contract = system.open(await JobContract.fromInit(seller.address, buyer.address)); // Open contract - using contract 

    await contract.send(seller, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getFunds()).toEqual(0n); // Deploy start state 

    // Increment counter
    let currentStatus = await contract.getContractStatus();
    await system.run();

    // Check counter
    expect(currentStatus).toEqual(0n);

  });

  it("2) Fund_Project - CHECK STATUS FUNDED - should not allow funding", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain 
    let seller = system.treasure("seller"); // Creates wallet (seller)
    let buyer = system.treasure("buyer"); // Creates wallet (seller)
    let contract = system.open(await JobContract.fromInit(seller.address, buyer.address)); // Open contract - using contract 
    
    await contract.send(seller, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getFunds()).toEqual(0n); // Deploy start state 

    await contract.send(seller, { value: toNano(1) },  { $$type: "Update_Status", statusID: 1n });
    await contract.send(seller, { value: toNano(1) },  { $$type: "Fund_Project", amount: 1n });
    
    await contract.send(seller, { value: toNano(1) },  { $$type: "Update_Status", statusID: 3n });
    await contract.send(seller, { value: toNano(1) },  { $$type: "Fund_Project", amount: 1n });
    
    await contract.send(seller, { value: toNano(1) },  { $$type: "Update_Status", statusID: 4n });
    await contract.send(seller, { value: toNano(1) },  { $$type: "Fund_Project", amount: 1n });
    
    await contract.send(seller, { value: toNano(1) },  { $$type: "Update_Status", statusID: 4n });
    await contract.send(seller, { value: toNano(1) },  { $$type: "Fund_Project", amount: 1n });

    await contract.send(seller, { value: toNano(1) },  { $$type: "Update_Status", statusID: 5n });
    await contract.send(seller, { value: toNano(1) },  { $$type: "Fund_Project", amount: 1n });

    await contract.send(seller, { value: toNano(1) },  { $$type: "Update_Status", statusID: 6n });
    await contract.send(seller, { value: toNano(1) },  { $$type: "Fund_Project", amount: 1n });
   
    
    await system.run();

    // Check counter
    expect(await contract.getFunds()).toEqual(0n);

  });

  it("3) Fund_Project - CHECK STATUS INVALID - Should allow funding", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain 
    let seller = system.treasure("seller"); // Creates wallet (seller)
    let buyer = system.treasure("buyer"); // Creates wallet (seller)
    let contract = system.open(await JobContract.fromInit(seller.address, buyer.address)); // Open contract - using contract 
    
    await contract.send(seller, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getFunds()).toEqual(0n); // Deploy start state 

    await contract.send(seller, { value: toNano(1) },  { $$type: "Update_Status", statusID: 8n });
    await contract.send(seller, { value: toNano(1) },  { $$type: "Fund_Project", amount: 250n });
    
    await system.run();

    // Check counter
    expect(await contract.getFunds()).toEqual(250n);

  });

  // TODO: Fix
  // it("Fund_Project - CHECK GETTERS - getContractStatus ", async () => {
  //   // Create ContractSystem and deploy contract 
  //   let system = await ContractSystem.create(); //dummy blockchain 
  //   let seller = system.treasure("seller"); // Creates wallet (seller)
  //   let contract = system.open(await JobContract.fromInit(seller.address)); // Open contract - using contract 
  //   await contract.send(seller, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
  //   await system.run(); // Execute
  
  //   await contract.send(seller, { value: toNano(1) },  { $$type: "Update_Status", statusID: 3n });
  //   await system.run();

    
    
  //   // Check counter
  //   expect(await contract.getContractStatus()).toEqual(2n);

  // });

  it("4) Fund_Project - CHECK GETTERS - getDeployedTime ", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain 
    let seller = system.treasure("seller"); // Creates wallet (seller)
    let buyer = system.treasure("buyer"); // Creates wallet (seller)
    let contract = system.open(await JobContract.fromInit(seller.address, buyer.address)); // Open contract - using contract 
    
    await contract.send(seller, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
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

  it("5) Fund_Project - CHECK GETTERS - getMaxTimeToDeposit ", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain 
    let seller = system.treasure("seller"); // Creates wallet (seller)
    let buyer = system.treasure("buyer"); // Creates wallet (seller)
    let contract = system.open(await JobContract.fromInit(seller.address, buyer.address)); // Open contract - using contract 
    
    await contract.send(seller, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
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
  it("6) Fund_Project - CHECK - Max time to deposit exceeded ", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain 
    let seller = system.treasure("seller"); // Creates wallet (seller)
    let buyer = system.treasure("buyer"); // Creates wallet (seller)
    let contract = system.open(await JobContract.fromInit(seller.address, buyer.address)); // Open contract - using contract 
    
    await contract.send(seller, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getFunds()).toEqual(0n); // Deploy start state 
    await system.run();

    await contract.send(seller, {value: toNano(1)}, {$$type: "Fund_Project", amount: 250n})
    await system.run();
   
    // Max time to deposit should be in 3 days - allowing deposit
    expect(await contract.getFunds()).toEqual(250n);

  });

  it("7) Fund_Project - CHECK - Incorrect funding amount should not increase funds", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain 
    let seller = system.treasure("seller"); // Creates wallet (seller)
    let buyer = system.treasure("buyer"); // Creates wallet (seller)
    let contract = system.open(await JobContract.fromInit(seller.address, buyer.address)); // Open contract - using contract 
    
    await contract.send(seller, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getFunds()).toEqual(0n); // Deploy start state 
    await system.run();

    await contract.send(seller, {value: toNano(1)}, {$$type: "Fund_Project", amount: 1n})
    await system.run();

    await contract.send(seller, {value: toNano(1)}, {$$type: "Fund_Project", amount: 10n})
    await system.run();

    await contract.send(seller, {value: toNano(1)}, {$$type: "Fund_Project", amount: 1000n})
    await system.run();

    await contract.send(seller, {value: toNano(1)}, {$$type: "Fund_Project", amount: 251n})
    await system.run();
   
    // No funding change with incorrect amount 
    expect(await contract.getFunds()).toBeLessThanOrEqual(0n);

  });

  it("8) und_Project - Should update contract status to 1 - Funded", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain 
    let seller = system.treasure("seller"); // Creates wallet (seller)
    let buyer = system.treasure("buyer"); // Creates wallet (seller)
    let contract = system.open(await JobContract.fromInit(seller.address, buyer.address)); // Open contract - using contract 
    
    await contract.send(seller, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getFunds()).toEqual(0n); // Deploy start state 
    await system.run();

    await contract.send(seller, {value: toNano(1)}, {$$type: "Fund_Project", amount: 250n})
    await system.run();

    // No funding change with incorrect amount 
    expect(await contract.getContractStatus()).toEqual(1n);

  });
});
