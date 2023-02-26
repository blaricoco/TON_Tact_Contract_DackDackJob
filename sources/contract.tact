import "@stdlib/deploy";

message Add {
    amount: Int as uint32;
}


contract SampleTactContract with Deployable {

    owner: Address;
    counter: Int as uint32;
    deployed_time: Int;


    init(owner: Address) {
        self.owner = owner;
        self.counter = 0;
        self.deployed_time = now();
    }

    fun add(v: Int) {
        
        // Check sender
        let ctx: Context = context();
        require(ctx.sender == self.owner, "Invalid sender");
        
        // Update counter
        self.counter = (self.counter + v);
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

    receive(msg: Add) {

        self.sendMessage(msg.amount);
        self.add(msg.amount);

    }

    receive("increment") {
        self.add(1);
    }

    receive("increment100") {
        self.add(100);
    }

    get fun counter(): Int {
        return self.counter;
    }

    get fun deployedtime(): Int {
        return self.deployed_time; 
    }
}
