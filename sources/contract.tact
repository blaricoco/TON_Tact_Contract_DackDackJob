import "@stdlib/deploy";

message Fund_Project {
    amount: Int as uint32;
}

message Update_Status {
    statusID: Int as uint32;
} 


contract JobContract with Deployable {

    owner: Address;
    counter: Int as uint32;
    deployed_time: Int as uint64;
    contract_status: Int;


    init(owner: Address) {
        self.owner = owner;
        self.counter = 0;
        self.deployed_time = now();
        self.contract_status = 0;
    }

    fun fund_Project(v: Int) {
        
        // Check state - Unfunded 
        require(self.contract_status == 0, "Incorrect State");
        //require(now(), "Max time to deposit exceeded")
        // Check sender - 
        //let ctx: Context = context();
        // require(ctx.sender == self.owner, "Invalid sender");
        
        
        // Update counter
        self.counter = (self.counter + v);
    }

    fun update_Status(v: Int) {
        // TODO: Check update status 
        require(v <= 6, "Invalid status");

        self.contract_status = v;
    }

    fun sendMessage( amount: Int) {

        // Check sender

        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");

        send(SendParameters{
            to: self.owner,
            value: ton("0.5"), 
            mode: SendIgnoreErrors, 
            bounce: true
        });

    }

    receive(msg: Fund_Project) {

        //self.sendMessage(msg.amount);
        self.fund_Project(msg.amount);
    }

    receive(msg: Update_Status) {

        self.update_Status(msg.statusID);
    }

    receive("fund") {
        self.fund_Project(1);
    }

    receive("contractStatus"){
        self.contract_status;
    }

    get fun counter(): Int {
        return self.counter;
    }

    get fun getDeployedTime(): Int {
        return self.deployed_time; 
    }

    get fun getContractStatus(): Int {
        return self.contract_status;
    }
}
