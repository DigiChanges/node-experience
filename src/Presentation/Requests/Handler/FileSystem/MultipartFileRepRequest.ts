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

    getName(): string {
        return this.file.filename.split(".").shift();
    }

    getOriginalName(): string {
        return this.file.originalname;
    }

    getMimeType(): string {
        return this.file.mimetype;
    }

    getPath(): string {
        return "/";
    }

    getExtension(): string {
        return this.file.originalname.split(".").pop();
    }

    getFile(): Express.Multer.File
    {
        return this.file;
    }
}

export default MultipartFileRepRequest;
