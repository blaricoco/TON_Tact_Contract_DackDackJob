import "@stdlib/deploy";

message Fund_Project {
    amount: Int as uint32;
}

message Update_Status {
    statusID: Int as uint32;
} 

message Dispute_Resolve {
    address: Address;
} 


contract JobContract with Deployable {

    seller: Address;
    buyer: Address;
    dispute_resolver: Address;
    funds: Int as uint32;
    deployed_time: Int as uint64;
    deposit_time: Int as uint64;
    delivery_time: Int as uint64;
    contract_status: Int;
    max_time_to_deposit: Int as uint64;
    max_time_to_complete: Int as uint64;
    max_time_to_review: Int as uint64;
    contract_price: Int as uint32;


    init(seller: Address, buyer: Address, dispute_resolver: Address) {
        self.seller = seller;
        self.buyer = buyer;
        self.dispute_resolver = dispute_resolver;
        self.funds = 0;
        self.deployed_time = now();
        self.deposit_time = 0;
        self.delivery_time = 0;
        self.contract_status = 0;
        self.max_time_to_deposit = 259200;
        self.max_time_to_complete = 259200;
        self.max_time_to_review = 259200;
        self.contract_price = 250;
        
    }

    fun fund_Project(v: Int) {
        
        // Check state - Unfunded 
        require(self.contract_status == 0, "Incorrect State, can only be funded when status unfunded");
        // Check max time to deposit has not been exceeded
        require(now() <= self.deployed_time + self.max_time_to_deposit, "Max time to deposit exceeded");
        // Check funds being deposited is exactly 
        require(v == self.contract_price, "Incorrect amount to fund contract");

        // Update contract for stage - Funded
        self.funds = (self.funds + v);
        self.deposit_time = now();
        self.contract_status = 1;
    }

    fun seller_delivered() {
        let ctx: Context = context();

        require(self.contract_status == 1, "Incorrect State, can only be delivered when status funded");
        require(self.seller == ctx.sender, "Only Seller can deliver");
        require(now() <= self.deposit_time + self.max_time_to_complete, "Max time to deliver exceeded");

        self.delivery_time = now();
        self.contract_status = 2;
    }

    // TODO: SEND VALUE ARRIVED IN WALLET
    fun buyer_accept() {
        let ctx: Context = context();

        require(self.contract_status == 2, "Incorrect State, can only be accepted when status delivered");
        require(self.buyer == ctx.sender, "Only Buyer can accept");
        require(now() <= self.delivery_time + self.max_time_to_review, "Max time to accept exceeded");

        send(SendParameters{
            to: self.seller,
            value: ton("0.5"), 
            mode: SendIgnoreErrors, 
            bounce: true
        });

        self.contract_status = 3;
    }

    fun buyer_dispute() {
        let ctx: Context = context();

        require(self.contract_status == 2, "Incorrect State, can only be accepted when status delivered");
        require(self.buyer == ctx.sender, "Only Buyer can dispute");
        require(now() <= self.delivery_time + self.max_time_to_review, "Max time to dispute exceeded");

        self.contract_status = 4;
    }

    // TODO: SEND VALUE ARRIVED IN WALLET
    fun dispute_resolve(winner: Address) {
        let ctx: Context = context();

        require(self.contract_status == 4, "Incorrect State, can only be accepted when status dispute");
        require(self.dispute_resolver == ctx.sender, "Only dispute resolver can resolve dispute");

        // Case when seller wins
        if (winner == self.seller) {
           
            send(SendParameters{
            to: self.seller,
            value: ton("0.5"), 
            mode: SendIgnoreErrors, 
            bounce: true
            });

            self.contract_status = 6;

        } 
        
        // Case when buyer wins
        else if (winner == self.buyer) {
            
            send(SendParameters{
            to: self.buyer,
            value: ton("0.5"), 
            mode: SendIgnoreErrors, 
            bounce: true
            });

            self.contract_status = 6;
        } 

        else {}
        
    }

    fun seller_not_delivered() {
        let ctx: Context = context();

        require(self.contract_status == 1, "Incorrect State, can only be Not delivered when status funded");
        require(self.buyer == ctx.sender, "Only Buyer can call - seller not delivered ");
        require(now() >= self.deposit_time + self.max_time_to_complete, "Max time to complete not exceeded");

        send(SendParameters{
            to: self.buyer,
            value: ton("0.5"), 
            mode: SendIgnoreErrors, 
            bounce: true
            });

        self.contract_status = 5;
    }

    fun buyer_not_reviewed() {
        let ctx: Context = context();

        require(self.contract_status == 2, "Incorrect State, needs to be status delivered");
        require(self.seller == ctx.sender, "Only Seller can call - buyer not reviewed ");
        require(now() >= self.delivery_time + self.max_time_to_review, "Max time to review not exceeded");

        send(SendParameters{
            to: self.seller,
            value: ton("0.5"), 
            mode: SendIgnoreErrors, 
            bounce: true
            });

        self.contract_status = 5;
    }

    fun update_Status(v: Int) {
    
        require(v <= 6, "Invalid status");

        self.contract_status = v;
    }

    fun sendMessage( amount: Int) {

        // Check sender

        let ctx: Context = context();
        require(ctx.sender == self.seller, "Invalid sender");

        send(SendParameters{
            to: self.seller,
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

    receive(msg: Dispute_Resolve) {

        self.dispute_resolve(msg.address);
    }

    receive("sellerDelivered"){
        self.seller_delivered();
    }

    receive("buyerAccept"){
        self.buyer_accept();
    }

    receive("buyerDispute"){
        self.buyer_dispute();
    }

    receive("sellerNotDelivered"){
        self.seller_not_delivered();
    }

    receive("buyerNotReviewed"){
        self.buyer_not_reviewed();
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

    get fun MaxTimeToComplete(): Int {
        return self.max_time_to_complete;
    }

    get fun MaxTimeToReview(): Int {
        return self.max_time_to_review;
    }

    get fun DeliveryTime(): Int {
        return self.delivery_time;
    }
}
