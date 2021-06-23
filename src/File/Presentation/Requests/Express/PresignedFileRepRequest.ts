import PresignedFileRepPayload from '../../../InterfaceAdapters/Payloads/PresignedFileRepPayload';
import {IsOptional, IsString} from 'class-validator';

class PresignedFileRepRequest implements PresignedFileRepPayload
{
    @IsString()
    filename: string;

    @IsOptional()
    @IsString()
    expiry: number;

    constructor(data: Record<string, any>)
    {
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
