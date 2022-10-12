import PresignedFileRepPayload from '../../Domain/Payloads/PresignedFileRepPayload';
import { IsInt, IsOptional, IsString } from 'class-validator';
import FileOptionsQueryRequest from './FileOptionsQueryRequest';

class PresignedFileRepRequest extends FileOptionsQueryRequest implements PresignedFileRepPayload
{
    private readonly _file: string;
    private readonly _expiry: number;

    constructor({ data, query }: any)
    {
        super({ query });
        this._file = data.file;
        this._expiry = data.expiry;
    }

    @IsString()
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
}

export default PresignedFileRepRequest;
