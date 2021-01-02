import * as express from 'express';
import PresignedFileRepPayload from '../../../../InterfaceAdapters/Payloads/FileSystem/PresignedFileRepPayload';
import {IsOptional, IsString} from "class-validator";

class PresignedFileRepRequest implements PresignedFileRepPayload
{
    @IsString()
    filename: string;

    @IsOptional()
    @IsString()
    expiry: number;

    constructor(request: express.Request)
    {
        this.filename = request.body.filename;
        this.expiry = request.body.expiry;
    }

    getName(): string
    {
        return this.filename;
    }

    getExpiry(): number
    {
        return this.expiry || 60 * 24 * 24 * 7;
    }
}

export default PresignedFileRepRequest;