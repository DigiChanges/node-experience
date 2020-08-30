import * as express from 'express';
import Base64RepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/Base64RepPayload';
import {body} from "express-validator";
class UploadBase64Request implements Base64RepPayload
{
    private request: express.Request;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    data(): object
    {
        return this.request.body.data;
    }

    filename(): string
    {
        return this.request.body.data?.filename;
    }

    base64(): { [key: string]: string}
    {
        console.log(this.request.body.base64);
        console.log("base64");
        return this.request.body.base64;
    }

    static validate()
    {
        return [
            body('data')
                .exists().withMessage('data must exist'),
            body('base64')
                .exists().withMessage('base64 must exist')
        ];
    }
    
}

export default UploadBase64Request;