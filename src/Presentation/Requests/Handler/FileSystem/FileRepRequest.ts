import * as express from 'express';
import FileRepPayload from '../../../../InterfaceAdapters/Payloads/FileSystem/DownloadPayload';
import {IsString} from "class-validator";

class FileRepRequest implements FileRepPayload
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