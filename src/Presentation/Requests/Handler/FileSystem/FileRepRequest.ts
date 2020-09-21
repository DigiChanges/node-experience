import * as express from 'express';
import DownloadFileRepPayload from '../../../../InterfaceAdapters/Payloads/FileSystem/DownloadFileRepPayload';
import {IsString} from "class-validator";

class FileRepRequest implements DownloadFileRepPayload
{
    @IsString()
    filename: string;

    constructor(request: express.Request)
    {
        this.filename = request.params.filename;
    }

    getName(): string
    {
        return this.filename;
    }    
}

export default FileRepRequest;