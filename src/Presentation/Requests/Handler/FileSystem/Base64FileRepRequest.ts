import * as express from "express";
import Base64FileRepPayload from "../../../../InterfaceAdapters/Payloads/FileSystem/Base64FileRepPayload";
import {IsBase64, IsMimeType, IsString} from "class-validator";

class Base64FileRepRequest implements Base64FileRepPayload
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
        throw new Error("Method not implemented.");
    }

    getExtension(): string
    {
        return this.filename.split(".").pop();
    }

    getBase64(): string
    {
        return this.base64.split(";base64").pop();
    }
}

export default Base64FileRepRequest;
