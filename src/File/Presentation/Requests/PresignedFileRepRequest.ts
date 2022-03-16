import PresignedFileRepPayload from '../../Domain/Payloads/PresignedFileRepPayload';
import { IsOptional, IsString } from 'class-validator';
import FileOptionsQueryRequest from './FileOptionsQueryRequest';

class PresignedFileRepRequest extends FileOptionsQueryRequest implements PresignedFileRepPayload
{
    private readonly _filename: string;
    private readonly _expiry: number;

    constructor({ data, query }: any)
    {
        super({ query });
        this._filename = data.filename;
        this._expiry = data.expiry;
    }

    @IsString()
    get name(): string
    {
        return this._filename;
    }

    @IsOptional()
    @IsString()
    get expiry(): number
    {
        return this._expiry || 60 * 24 * 24 * 7;
    }
}

export default PresignedFileRepRequest;
