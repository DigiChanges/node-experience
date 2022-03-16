import FileBase64RepPayload from '../../Domain/Payloads/FileBase64RepPayload';
import { IsBase64, IsMimeType, IsNumber, IsString } from 'class-validator';
import FileOptionsQueryRequest from './FileOptionsQueryRequest';

class FileBase64RepRequest extends FileOptionsQueryRequest implements FileBase64RepPayload
{
    private readonly _mimeType: string;
    private readonly _filename: string;
    private readonly _base64: string;

    constructor({ data, query }: any)
    {
        super({ query });
        this._filename = data.filename;
        this._base64 = data.base64.split(';base64,').pop();
        this._mimeType = data.base64.split(';base64').shift().split('data:').pop();
    }

    @IsString()
    get originalName(): string
    {
        return this._filename;
    }

    @IsMimeType()
    get mimeType(): string
    {
        return this._mimeType;
    }

    @IsString()
    get path(): string
    {
        return '/';
    }

    @IsString()
    get extension(): string
    {
        return this._filename.includes('.') ? this._filename.split('.').pop() : null;
    }

    @IsNumber()
    get size(): number
    {
        const MIMETYPE_SIZE = 814;
        const ENCODING_INCREMENT_SIZE = 1.37;
        return Math.floor((this._base64.length - MIMETYPE_SIZE) / ENCODING_INCREMENT_SIZE);
    }

    @IsBase64()
    get base64(): string
    {
        return this._base64;
    }
}

export default FileBase64RepRequest;
