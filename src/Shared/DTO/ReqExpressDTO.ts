import {Request} from 'express';
import {ParsedQs} from 'qs';
import IReqDTO from '../InterfaceAdapters/IReqDTO';

class ReqExpressDTO implements IReqDTO
{
    public headers: Record<string, any>;
    public url: string;
    public params: Record<string, any>;
    public query: ParsedQs;
    public body: Record<string, any>;

    constructor({headers, url, params, query, body}: Request)
    {
        this.headers = headers;
        this.url = url;
        this.params = params;
        this.query = query;
        this.body = body;
    }
}

export default ReqExpressDTO;