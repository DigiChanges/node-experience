import FileBase64RepPayload from '../../Domain/Payloads/FileBase64RepPayload';
import { IsBase64, IsMimeType, IsString } from 'class-validator';
import FileOptionsQueryRequest from './FileOptionsQueryRequest';

class FileBase64RepRequest extends FileOptionsQueryRequest implements FileBase64RepPayload
{
    @IsMimeType()
    mimeType: string;

    @IsString()
    filename: string;

    @IsBase64()
    base64: string;

    constructor({ data, query }: any)
    {
        super({ query });
        this.filename = data.filename;
        this.base64 = data.base64.split(';base64,').pop();
        this.mimeType = data.base64.split(';base64').shift().split('data:').pop();
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
        return '/';
    }

    getExtension(): string
    {
        return this.filename.includes('.') ? this.filename.split('.').pop() : null;
    }

    getSize(): number
    {
        const MIMETYPE_SIZE = 814;
        const ENCODING_INCREMENT_SIZE = 1.37;
        return Math.floor((this.base64.length - MIMETYPE_SIZE) / ENCODING_INCREMENT_SIZE);
    }

    getBase64(): string
    {
        return this.base64;
    }
}

export default FileBase64RepRequest;
