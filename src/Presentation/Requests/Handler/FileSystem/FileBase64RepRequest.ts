import * as express from "express";
import FileBase64RepPayload from "../../../../InterfaceAdapters/Payloads/FileSystem/FileBase64RepPayload";
import {IsBase64, IsMimeType, IsString} from "class-validator";

class FileBase64RepRequest implements FileBase64RepPayload
{
    @IsMimeType()
    mimeType: string;

    @IsString()
    filename: string;

    @IsBase64()
    base64: string;

    constructor(request: express.Request)
    {
        this.filename = request.body.filename;
        this.base64 = request.body.base64.split(";base64,").pop();
        this.mimeType = request.body.base64.split(";base64").shift().split("data:").pop();
    }

    getName(): string
    {
        return this.filename.split(".").shift();
    }

    getOriginalName(): string
    {
        return this.filename;
    }

    getMimeType(): string
    {
        return this.mimeType;
    }

    getPath(): string
    {
        return "/";
    }

    getExtension(): string
    {
        return this.filename.split(".").pop();
    }

    getSize(): number
    {
        return Math.round((this.base64.length - 814) / 1.37)  ;
    }

    getBase64(): string
    {
        return this.base64;
    }
}

export default FileBase64RepRequest;
