import * as express from 'express';
import DownloadPayload from '../../../InterfaceAdapters/Payloads/FileSystem/DownloadPayload';
import {body} from "express-validator";

class PostDownloadRequest implements DownloadPayload
{
    private request: express.Request;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    filename(): string
    {
        return this.request.body.data?.filename;
    }

    static validate()
    {
        return [
            body('data')
                .exists().withMessage('data must exist')
        ];
    }
    
}

export default PostDownloadRequest;