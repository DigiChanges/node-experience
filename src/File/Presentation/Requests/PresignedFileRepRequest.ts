import PresignedFileRepPayload from '../../Domain/Payloads/PresignedFileRepPayload';
import { IsInt, IsOptional, IsUUID } from 'class-validator';
import FileOptionsQueryRequest from './FileOptionsQueryRequest';

class PresignedFileRepRequest extends FileOptionsQueryRequest implements PresignedFileRepPayload
{
    private readonly _file: string;
    private readonly _expiry: number;
    private readonly _version: number;

    constructor({ data, query }: any)
    {
        super({ query });
        this._file = data.file;
        this._expiry = data.expiry;
        this._version = data.version;
    }

    @IsUUID()
    get file(): string
    {
        return this._file;
    }

    @IsOptional()
    @IsInt()
    get expiry(): number
    {
        return this._expiry || 60 * 24 * 24 * 7;
    }

    @IsOptional()
    @IsInt()
    get version(): number
    {
        return this._version;
    }
}

export default PresignedFileRepRequest;
