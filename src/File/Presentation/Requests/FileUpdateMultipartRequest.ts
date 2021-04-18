import * as express from 'express';
import IdRequest from '../../../App/Presentation/Requests/IdRequest';
import FileUpdateMultipartPayload from '../../InterfaceAdapters/Payloads/FileUpdateMultipartPayload';
import {IsDefined} from 'class-validator';

class FileUpdateMultipartRequest extends IdRequest implements FileUpdateMultipartPayload
{
    @IsDefined()
    file: Express.Multer.File;

    constructor(request: express.Request)
    {
        super(request);
        this.file = request.file;
    }

    getName(): string
    {
        return this.file.filename.split('.').shift();
    }

    getOriginalName(): string
    {
        return this.file.originalname;
    }

    getMimeType(): string
    {
        return this.file.mimetype;
    }

    getPath(): string
    {
        return '/';
    }

    getExtension(): string
    {
        return this.file.originalname.split('.').pop();
    }

    getFile(): Express.Multer.File
    {
        return this.file;
    }

    getSize(): number
    {
        return this.file.size;
    }
}

export default FileUpdateMultipartRequest;
