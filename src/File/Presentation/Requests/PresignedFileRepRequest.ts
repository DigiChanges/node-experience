import PresignedFileRepPayload from '../../Domain/Payloads/PresignedFileRepPayload';
import { IsOptional, IsString } from 'class-validator';
import FileOptionsQueryRequest from './FileOptionsQueryRequest';

class PresignedFileRepRequest extends FileOptionsQueryRequest implements PresignedFileRepPayload
{
    @IsString()
    filename: string;

    @IsOptional()
    @IsString()
    expiry: number;

    constructor({ data, query }: any)
    {
        super({ query });
        this.filename = data.filename;
        this.expiry = data.expiry;
    }

    getName(): string
    {
        return this.filename;
    }

    getExpiry(): number
    {
        return this.expiry || 60 * 24 * 24 * 7;
    }
}

export default PresignedFileRepRequest;
