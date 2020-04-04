import IPagination from "../Contracts/IPagination";
import * as express from "express";
// import querystring from "querystring"; // TODO: Encapsulate and separet on an lib to create new functionality

class Pagination implements IPagination
{
    private limit: number;
    private offset: number;
    private _url: string;
    private request: express.Request;

    constructor(request: express.Request)
    {
        this.request = request;
        this.limit = request.query.pagination.limit;
        this.offset = request.query.pagination.offset;
    }

    getLimit(): number
    {
        return this.limit;
    }

    getOffset(): number
    {
        return this.offset;
    }

    getCurrentUrl(): string
    {
        let url = this.request.get('host') + this.request.url;
        return url
    }

    getNextUrl(): string
    {
        let offset = Number(this.request.query.pagination.offset) + Number(this.request.query.pagination.limit);

        let url = this.request.get('host') + this.request.url;
        const searchValue = 'pagination[offset]=' + this.request.query.pagination.offset;
        const newValue = 'pagination[offset]=' + offset;

        url = url.replace(searchValue, newValue);

        return url;
    }
}

export default Pagination;