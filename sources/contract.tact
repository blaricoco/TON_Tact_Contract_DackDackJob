import "@stdlib/deploy";

message Fund_Project {
    amount: Int as uint32;
}

message Update_Status {
    statusID: Int as uint32;
} 


contract JobContract with Deployable {

    owner: Address;
    funds: Int as uint32;
    deployed_time: Int as uint64;
    deposit_time: Int as uint64;
    contract_status: Int;
    max_time_to_deposit: Int as uint64;
    contract_price: Int as uint32;


    init(owner: Address) {
        self.owner = owner;
        self.funds = 0;
        self.deployed_time = now();
        self.contract_status = 0;
        self.max_time_to_deposit = 259200;
        self.contract_price = 250;
    }

    fun fund_Project(v: Int) {
        
        // Check state - Unfunded 
        require(self.contract_status == 0, "Incorrect State");
        // Check max time to deposit has not been exceeded
        require(now() <= self.deployed_time + self.max_time_to_deposit, "Max time to deposit exceeded");
        // Check funds being deposited is exactly 
        require(v == self.contract_price, "Incorrect amount to fund contract");

        // Update contract for stage - Funded
        self.funds = (self.funds + v);
        self.deposit_time = now();
        self.contract_status = 1;
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

    get fun Funds(): Int {
        return self.funds;
    }

    get fun DeployedTime(): Int {
        return self.deployed_time; 
    }

    get fun DepositTime(): Int {
        return self.deposit_time;
    }

    get fun ContractStatus(): Int {
        return self.contract_status;
    }

    get fun MaxTimeToDeposit(): Int {
        return self.max_time_to_deposit;
    }
}
