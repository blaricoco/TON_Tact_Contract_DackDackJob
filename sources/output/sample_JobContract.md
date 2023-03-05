# TACT Compilation Report
Contract: JobContract
BOC Size: 2116 bytes

# Types
Total Types: 8

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## Fund_Project
TLB: `fund_project#442d446e amount:uint32 = Fund_Project`
Signature: `Fund_Project{amount:uint32}`

## Update_Status
TLB: `update_status#3200e09b statusID:uint32 = Update_Status`
Signature: `Update_Status{statusID:uint32}`

## Dispute_Resolve
TLB: `dispute_resolve#7c89c43f address:address = Dispute_Resolve`
Signature: `Dispute_Resolve{address:address}`

# Get Methods
Total Get Methods: 8

## Funds

## DeployedTime

## DepositTime

## ContractStatus

## MaxTimeToDeposit

## MaxTimeToComplete

## MaxTimeToReview

## DeliveryTime

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
3028: Max time to complete not exceeded
3234: Only Seller can deliver
3546: Only Seller can call - buyer not reviewed
3956: Incorrect State, can only be accepted when status dispute
4429: Invalid sender
7872: Max time to deposit exceeded
18044: Incorrect State, can only be Not delivered when status funded
18675: Max time to review not exceeded
22025: Only Buyer can accept
22641: Max time to deliver exceeded
27002: Invalid status
27088: Incorrect State, needs to be status delivered
32991: Incorrect State, can only be funded when status unfunded
37959: Max time to dispute exceeded
38848: Incorrect State, can only be accepted when status delivered
39030: Only dispute resolver can resolve dispute
49548: Only Buyer can call - seller not delivered
49940: Incorrect State, can only be delivered when status funded
52504: Only Buyer can dispute
57500: Max time to accept exceeded
57710: Incorrect amount to fund contract