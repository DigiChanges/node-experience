import * as express from "express";
import MultipartFileRepPayload from "../../../../InterfaceAdapters/Payloads/FileSystem/MultipartFileRepPayload";
import {IsDefined} from "class-validator";

class MultipartFileRepRequest implements MultipartFileRepPayload
{
    @IsDefined()
    file: Express.Multer.File;

    constructor(request: express.Request)
    {
        this.file = request.file;
    }

    getFile(): Express.Multer.File
    {
        return this.file;
    }
}

export default MultipartFileRepRequest;
