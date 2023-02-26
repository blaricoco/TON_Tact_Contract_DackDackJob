import { toNano, fromNano } from "ton";
import { ContractSystem } from "ton-emulator";
import { SampleTactContract } from "./output/sample_SampleTactContract";

describe("contract", () => {
    it("should deploy correctly", async () => {
        // Create ContractSystem and deploy contract 
        let system = await ContractSystem.create(); //dummy blockchain 
        let owner = system.treasure("owner"); // Creates wallet (owner)
        let contract = system.open(await SampleTactContract.fromInit(owner.address)); // Open contract - using contract 
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
        await system.run(); // Execute
      
        // Check counter
        expect(await contract.getCounter()).toEqual(0n); // Deploy start state 

        // Increment counter
        await contract.send(owner, { value: toNano(1) }, "increment"); 
        await contract.send(owner, { value: toNano(1) }, "increment"); 
        await system.run();

        // Check counter
        expect(await contract.getCounter()).toEqual(2n);

    });
    it("Should increment by 3", async () => {
      // Create ContractSystem and deploy contract 
      let system = await ContractSystem.create(); //dummy blockchain 
      let owner = system.treasure("owner"); // Creates wallet (owner)
      let contract = system.open(await SampleTactContract.fromInit(owner.address)); // Open contract - using contract 
      await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
      await system.run(); // Execute
    
      // Check counter
      expect(await contract.getCounter()).toEqual(0n); // Deploy start state 

      // Increment counter
      await contract.send(owner, { value: toNano(3) }, {$$type: "Add", amount: 3n}); 

      await system.run();

      // Check counter
      expect(await contract.getCounter()).toEqual(3n);
      
  });
  it("Should increment by 100", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain 
    let owner = system.treasure("owner"); // Creates wallet (owner)
    let contract = system.open(await SampleTactContract.fromInit(owner.address)); // Open contract - using contract 
    await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getCounter()).toEqual(0n); // Deploy start state 

    // Increment counter
    await contract.send(owner, { value: toNano(1) }, "increment100");
    await system.run();

    // Check counter
    expect(await contract.getCounter()).toEqual(100n);
    
  });
  it("Increment restricted by owner", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain
    let owner = system.treasure("owner"); // Creates wallet (owner)
    // Use another account to send
    let stranger = system.treasure("random");
    let contract = system.open(await SampleTactContract.fromInit(owner.address)); // Open contract - using contract 
    
    await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getCounter()).toEqual(0n); // Deploy start state 
    
    // Increment counter
    await contract.send(stranger, { value: toNano(1) }, "increment100");
    await system.run();

    // Check counter
    expect(await contract.getCounter()).toEqual(0n);
    
  });
  it("Query contract balance", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain
    let owner = system.treasure("owner"); // Creates wallet (owner)
    let contract = system.open(await SampleTactContract.fromInit(owner.address)); // Open contract - using contract 
    
    // Returns balance after deployment - TBD
    await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getCounter()).toEqual(0n); // Deploy start state 

    // Get balance
    //console.log(await system.contract(contract.address).balance);
    
    // Increment counter
    await contract.send(owner, { value: toNano(1) }, "increment100");
    await system.run();

    //console.log(await system.contract(contract.address).balance);

    await contract.send(owner, { value: toNano(3) }, {$$type: "Add", amount: 3n}); 
    await system.run();

    // Check counter
    expect(await system.contract(contract.address).balance).toBeGreaterThan(999999999n);

  });

  // TODO: Send half a ton back to owner - when increment 100
  it("Send half a ton back to owner - for increment", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain
    let owner = system.treasure("owner"); // Creates wallet (owner)
    let contract = system.open(await SampleTactContract.fromInit(owner.address)); // Open contract - using contract 
    
    // Returns balance after deployment - TBD
    await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getCounter()).toEqual(0n); // Deploy start state 

    // Get wallet
    let ownerWallet = await owner.address;
  
    // Use wallet address and get balance

    console.log(fromNano( await system.contract(ownerWallet).balance));

    // Increment counter
    await contract.send(owner, { value: toNano(3) }, {$$type: "Add", amount: 3n}); 
    await system.run();

    // Check owner balance
    console.log(fromNano( await system.contract(ownerWallet).balance));

    // Check counter
    expect(await system.contract(contract.address).balance).toBeGreaterThan(999999999n);
    
  });

  // TODO: Send half a ton back to owner - when increment 100
  it("Get deployed time", async () => {
    // Create ContractSystem and deploy contract 
    let system = await ContractSystem.create(); //dummy blockchain
    let owner = system.treasure("owner"); // Creates wallet (owner)
    let contract = system.open(await SampleTactContract.fromInit(owner.address)); // Open contract - using contract 
    
    // Returns balance after deployment - TBD
    await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n }); // Deploy
    await system.run(); // Execute
  
    // Check counter
    expect(await contract.getCounter()).toEqual(0n); // Deploy start state 

    console.log(fromNano( await contract.getDeployedtime()));

 
    // Check counter
    expect(await contract.getDeployedtime()).toBeLessThan(3n);
  });
});
