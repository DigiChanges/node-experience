import * as express from 'express';
import multer from 'multer';
import MultipartRepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/MultipartRepPayload';

class UploadMultipartRequest implements MultipartRepPayload
{
    private request: express.Request;
    private fields: multer.Multer;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    file(): any
    {
        console.log(this.request.body);
        return this.request.body.file;
    }
    
}

export default UploadMultipartRequest;