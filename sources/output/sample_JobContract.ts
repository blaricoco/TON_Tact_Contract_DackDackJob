import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type Fund_Project = {
    $$type: 'Fund_Project';
    amount: bigint;
}

export function storeFund_Project(src: Fund_Project) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1143817326, 32);
        b_0.storeUint(src.amount, 32);
    };
}

export function loadFund_Project(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1143817326) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadUintBig(32);
    return { $$type: 'Fund_Project' as const, amount: _amount };
}

function loadTupleFund_Project(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Fund_Project' as const, amount: _amount };
}

function storeTupleFund_Project(source: Fund_Project) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserFund_Project(): DictionaryValue<Fund_Project> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFund_Project(src)).endCell());
        },
        parse: (src) => {
            return loadFund_Project(src.loadRef().beginParse());
        }
    }
}

export type Update_Status = {
    $$type: 'Update_Status';
    statusID: bigint;
}

export function storeUpdate_Status(src: Update_Status) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(838918299, 32);
        b_0.storeUint(src.statusID, 32);
    };
}

export function loadUpdate_Status(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 838918299) { throw Error('Invalid prefix'); }
    let _statusID = sc_0.loadUintBig(32);
    return { $$type: 'Update_Status' as const, statusID: _statusID };
}

function loadTupleUpdate_Status(source: TupleReader) {
    let _statusID = source.readBigNumber();
    return { $$type: 'Update_Status' as const, statusID: _statusID };
}

function storeTupleUpdate_Status(source: Update_Status) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.statusID);
    return builder.build();
}

function dictValueParserUpdate_Status(): DictionaryValue<Update_Status> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdate_Status(src)).endCell());
        },
        parse: (src) => {
            return loadUpdate_Status(src.loadRef().beginParse());
        }
    }
}

 type JobContract_init_args = {
    $$type: 'JobContract_init_args';
    seller: Address;
    buyer: Address;
}

function initJobContract_init_args(src: JobContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.seller);
        b_0.storeAddress(src.buyer);
    };
}

async function JobContract_init(seller: Address, buyer: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initJobContract_init_args({ $$type: 'JobContract_init_args', seller, buyer })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const JobContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    3234: { message: `Only Seller can deliver` },
    4429: { message: `Invalid sender` },
    7872: { message: `Max time to deposit exceeded` },
    22025: { message: `Only Buyer can accept` },
    22641: { message: `Max time to deliver exceeded` },
    27002: { message: `Invalid status` },
    32991: { message: `Incorrect State, can only be funded when status unfunded` },
    37959: { message: `Max time to dispute exceeded` },
    38848: { message: `Incorrect State, can only be accepted when status delivered` },
    49940: { message: `Incorrect State, can only be delivered when status funded` },
    52504: { message: `Only Buyer can dispute` },
    57500: { message: `Max time to accept exceeded` },
    57710: { message: `Incorrect amount to fund contract` },
}

export class JobContract implements Contract {
    
    static async init(seller: Address, buyer: Address) {
        return await JobContract_init(seller, buyer);
    }
    
    static async fromInit(seller: Address, buyer: Address) {
        const init = await JobContract_init(seller, buyer);
        const address = contractAddress(0, init);
        return new JobContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new JobContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: JobContract_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Fund_Project | Update_Status | 'sellerDelivered' | 'buyerAccept' | 'buyerDispute' | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Fund_Project') {
            body = beginCell().store(storeFund_Project(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Update_Status') {
            body = beginCell().store(storeUpdate_Status(message)).endCell();
        }
        if (message === 'sellerDelivered') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'buyerAccept') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'buyerDispute') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getFunds(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('Funds', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getDeployedTime(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('DeployedTime', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getDepositTime(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('DepositTime', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getContractStatus(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('ContractStatus', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getMaxTimeToDeposit(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('MaxTimeToDeposit', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getMaxTimeToComplete(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('MaxTimeToComplete', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getMaxTimeToReview(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('MaxTimeToReview', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getDeliveryTime(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('DeliveryTime', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}