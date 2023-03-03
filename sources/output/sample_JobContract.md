# TACT Compilation Report
Contract: JobContract
BOC Size: 1031 bytes

# Types
Total Types: 7

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

# Get Methods
Total Get Methods: 5

## Funds

## DeployedTime

## DepositTime

## ContractStatus

## MaxTimeToDeposit

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
4429: Invalid sender
7872: Max time to deposit exceeded
27002: Invalid status
38831: Incorrect State
57710: Incorrect amount to fund contract