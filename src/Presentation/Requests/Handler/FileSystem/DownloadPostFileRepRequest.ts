import * as express from 'express';
import DownloadFileRepPayload from '../../../../InterfaceAdapters/Payloads/FileSystem/DownloadFileRepPayload';
import {IsString} from "class-validator";

class DownloadPostFileRepRequest implements DownloadFileRepPayload
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