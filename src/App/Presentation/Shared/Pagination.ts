import * as express from 'express';
import Config from 'config';
import {IPagination} from '@digichanges/shared-experience';
// import querystring from "querystring"; // TODO: Encapsulate and split it on an lib to create new functionality

class Pagination implements IPagination
{
    private readonly limit: number;
    private readonly offset: number;
    private request: express.Request;
    private readonly exist: boolean = false;
    private pagination: any;
    private readonly host: string;

    constructor(request: express.Request)
    {
        this.request = request;
        this.pagination = request.query.pagination;
        this.limit = request.query?.pagination ? Number(this.pagination.limit) : 10;
        this.offset = request.query?.pagination ? Number(this.pagination.offset) : 0;
        this.exist = request.query?.pagination !== undefined;
        this.host = Config.get('url.urlApi');
    }

    getPath(): string
    {
        return this.host;
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
        return this.exist ? this.host + this.request.url.replace('/api/', '') : '';
    }

    // TODO: Refactoring with querystrings to reform query without harcoding URI
    getNextUrl(): string
    {
        let url = '';

        if (this.exist)
        {
            const offset = this.offset + this.limit;

            url = this.host + this.request.url.replace('/api/', '');
            const searchValue = `pagination[offset]=${this.pagination.offset}`;
            const newValue = `pagination[offset]=${offset}`;

            url = url.replace(searchValue, newValue);
        }

        return url;
    }

    getExist(): boolean
    {
        return this.exist;
    }
}

export default Pagination;
