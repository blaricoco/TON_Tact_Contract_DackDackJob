
## START 


VARIABLES
---------
* Buyer     - Address
* Seller    - Address
* Dispute resolver - Address 
* Price     - Int (pence 9)
* Max time to complete - Number of seconds (from funded contract)
* Max time to deposit - Number of seconds (from deployment)
* Max time to review - Number of seconds (from Delivery)
* Contract Status - Unfunded/Funded/Delivered/Accepted/Cancelled/Dispute/Resolved - int?
* Deployed time - Date Time (TBD)
* Deposit time - Date Time (TBD)
* Delivery time - Date Time (TBD)

STATES
---------
Contract Status
0) Unfunded
1) Funded
2) Delivered
3) Accepted
4) Cancelled
5) Dispute
6) Resolved

CONSTRUCTOR (Creating)
---------
* Set buyer Address
* Set Seller Address
* Set Dispute resolver Address
* Set Price
* Set Max time to complete
* Max time to deposit = 3 days
* Contract Status = Unfunded
* Deployed time = Date.Now ---
* Max time to review = 7 days



MESSAGES (Actions - state change) - Expensive
---------

[ANONYMOUS]
* Fund_Project (funds_Sent Int (pence 9) ) {

    If Contract Status != Unfunded ===> Error (Incorrect state)
    If Date.Now >= Max time to deposit + Deployed time ===> Error (Max time to deposit exceeded)
    If funds_Sent != Price ===> Error (Incorrect amount)

    Deposit time = Date.Now
    Contract Status = Funded
}

* Seller_Delivered () {
    If Contract Status != Funded ===> Error (Incorrect state)
    If message_sender != Seller ===> Error (Incorrect user)
    If Date.Now >= Deposit time + Max time to complete ===> Error (Max time to deliver exceded) 
        
    Delivery time = Date.Now
    Contract Status = Delivered 
}

* Buyer_Accept () {
    If Contract Status != Delivered ===> Error (Incorrect state)
    If message_sender != Buyer ===> Error (Incorrect user)
    If Date.Now >= Delivery time + Max time to review ===> Error (max time to review exceded)

    Contract Status = Accepted
    Send (Contract.Balance) to Seller
}

* Buyer_Dispute () {
    If Contract Status != Delivered ===> Error (Incorrect state)
    If message_sender != Buyer ===> Error (Incorrect user)
    If Date.Now >= Delivery time + Max time to review ===> Error (max time to review exceded)

    Contract Status = Dispute
}

* Dispute_Resolve (who won Address ) {
    If Contract Status != Dispute ===> Error (Incorrect state)
    If message_sender != Dispute resolver ===> Error (Incorrect user)
    If who won == Seller
        Send (Contract.Balance) to Seller

    ELSE If who won == Buyer
        Send (Contract.Balance) to Buyer

    Else ===> Error (Incorrect winner)

    Contract Staus = Resolved
}

* Seller_Not_Delivered () {
    If Contract Status != Funded ===> Error (Incorrect state)
    If message_sender != Buyer ===> Error (Incorrect user)
    If Date.Now <= Deposit time + Max time to complete ===> Error (Max time to deliver not exceded)
        
    Contract Status = Cancelled 
    Send (Contract.Balance) to Buyer
}

* Buyer_Not_Reviewed () {
    If Contract Status != Delivered ===> Error (Incorrect state)
    If message_sender != Seller ===> Error (Incorrect user)
    If Date.Now <= Delivery time + Max time to review ===> Error (max time to review not exceded)

    Contract Status = Cancelled
    Send (Contract.Balance) to Seller
}


GETTERS (Read only) - Low cost
---------
* Get_Contract_Status () {
    Return Contract_Status
}

* Get_Contract_Times () {

} 


## Start new suite
* Create a new test function for every user story

### Before
* Seller deploy the contract 

### User Story
* 
* 
* 
* 