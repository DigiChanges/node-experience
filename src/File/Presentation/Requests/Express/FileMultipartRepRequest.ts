import FileMultipartRepPayload from '../../../InterfaceAdapters/Payloads/FileMultipartRepPayload';
import { IsDefined } from 'class-validator';

// TODO: Refactor express multer file dependency
class FileMultipartRepRequest implements FileMultipartRepPayload
{
    @IsDefined()
    file: Express.Multer.File;

    constructor(data: Record<string, any>)
    {
        this.file = data.file;
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

    getSize(): number
    {
        return this.file.size;
    }

    getFile(): Express.Multer.File
    {
        return this.file;
    }
}

export default FileMultipartRepRequest;
