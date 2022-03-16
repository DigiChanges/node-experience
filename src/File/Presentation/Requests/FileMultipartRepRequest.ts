import FileMultipartRepPayload from '../../Domain/Payloads/FileMultipartRepPayload';
import { IsDefined, IsNumber, IsString } from 'class-validator';
import FileOptionsQueryRequest from './FileOptionsQueryRequest';

class FileMultipartRepRequest extends FileOptionsQueryRequest implements FileMultipartRepPayload
{
    private readonly _file: any;

    constructor({ file, query }: any)
    {
        super({ query });
        this._file = file;
    }

    @IsString()
    get originalName(): string
    {
        return this._file.originalname;
    }

    @IsString()
    get mimeType(): string
    {
        return this._file.mimetype;
    }

    @IsString()
    get path(): string
    {
        return '/';
    }

    get extension(): string | null
    {
        return this._file.originalname.includes('.') ? this._file.originalname.split('.').pop() : null;
    }

    @IsNumber()
    get size(): number
    {
        return this._file.size;
    }

    @IsDefined()
    file(): any
    {
        return this._file;
    }
}

export default FileMultipartRepRequest;
