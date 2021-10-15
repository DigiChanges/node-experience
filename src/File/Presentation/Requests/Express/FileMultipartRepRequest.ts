import FileMultipartRepPayload from '../../../InterfaceAdapters/Payloads/FileMultipartRepPayload';
import { IsDefined } from 'class-validator';


class FileMultipartRepRequest implements FileMultipartRepPayload
{
    @IsDefined()
    file: any;

    constructor(data: Record<string, any>)
    {
        this.file = data.file;
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

    getFile(): any
    {
        return this.file;
    }
}

export default FileMultipartRepRequest;
