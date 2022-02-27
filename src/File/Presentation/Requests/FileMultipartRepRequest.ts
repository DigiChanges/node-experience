import FileMultipartRepPayload from '../../Domain/Payloads/FileMultipartRepPayload';
import { IsDefined } from 'class-validator';
import FileOptionsQueryRequest from './FileOptionsQueryRequest';

class FileMultipartRepRequest extends FileOptionsQueryRequest implements FileMultipartRepPayload
{
    @IsDefined()
    file: any;

    constructor({ file, query }: any)
    {
        super({ query });
        this.file = file;
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

    getExtension(): string | null
    {
        return this.file.originalname.includes('.') ? this.file.originalname.split('.').pop() : null;
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
