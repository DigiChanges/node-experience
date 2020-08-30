import * as express from 'express';
import ListObjectsPayload from "../../../InterfaceAdapters/Payloads/FileSystem/ListObjectsPayload"
import {query} from "express-validator";
class ListObjectsRequest implements ListObjectsPayload
{
    private request: express.Request;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    recursive(): boolean
    {
        return (this.request.query.recursive === 'true');
    }

    prefix(): string
    {
        return this.request.query.hasOwnProperty('prefix') ? String(this.request.query.prefix) : undefined;
    }

    static validate()
    {
        return [
            query('recursive')
                .optional()
                .isBoolean().withMessage('recursive must be of type boolean'),
            query('prefix')
                .optional()
                .isString().withMessage('prefix must be of type string'),
        ];
    }
    
}

export default ListObjectsRequest;