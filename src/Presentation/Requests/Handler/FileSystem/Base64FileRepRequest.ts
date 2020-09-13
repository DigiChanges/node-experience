import * as express from "express";
import Base64FileRepPayload from "../../../../InterfaceAdapters/Payloads/FileSystem/Base64FileRepPayload";
import {IsBase64, IsString} from "class-validator";

class Base64FileRepRequest implements Base64FileRepPayload
{
    @IsString()
    filename: string;

    @IsBase64()
    base64: string;

    constructor(request: express.Request)
    {
        this.filename = request.body.filename;
        this.base64 = request.body.base64;
    }

    getFilename(): string
    {
        return this.filename;
    }

    getBase64(): string
    {
        return this.base64;
    }
}

export default Base64FileRepRequest;
