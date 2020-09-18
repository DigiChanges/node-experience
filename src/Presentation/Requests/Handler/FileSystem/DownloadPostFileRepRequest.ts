import * as express from 'express';
import FileRepPayload from '../../../../InterfaceAdapters/Payloads/FileSystem/DownloadPayload';
import {IsString} from "class-validator";

class DownloadPostFileRepRequest implements FileRepPayload
{
    @IsString()
    filename: string;

    constructor(request: express.Request)
    {
        this.filename = request.body.filename;
    }

    getName(): string
    {
        return this.filename;
    }    
}

export default DownloadPostFileRepRequest;