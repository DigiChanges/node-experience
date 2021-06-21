import * as express from 'express';
import ListObjectsPayload from '../../../InterfaceAdapters/Payloads/ListObjectsPayload';
import {IsBoolean, IsOptional} from 'class-validator';

class ListObjectsRequest implements ListObjectsPayload
{
    @IsOptional()
    @IsBoolean()
    recursive: string;

    @IsOptional()
    @IsBoolean()
    prefix: string;

    constructor(request: express.Request)
    {
        this.recursive = request.query.recursive ? String(request.query.recursive) : undefined;
        this.prefix = request.query?.prefix ? String(request.query.prefix) : undefined;
    }

    getRecursive(): boolean
    {
        return (this.recursive?.toLowerCase() === 'true');
    }

    getPrefix(): string
    {
        return this.prefix;
    }
}

export default ListObjectsRequest;
