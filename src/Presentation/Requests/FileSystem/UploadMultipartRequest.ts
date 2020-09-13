import * as express from 'express';
import MultipartRepPayload from '../../../InterfaceAdapters/Payloads/FileSystem/MultipartRepPayload';

class UploadMultipartRequest implements MultipartRepPayload
{
    private request: express.Request;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    file(): Express.Multer.File
    {
        return this.request.file;
    }
    
}

export default UploadMultipartRequest;