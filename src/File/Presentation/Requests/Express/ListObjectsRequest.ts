import ListObjectsPayload from '../../../InterfaceAdapters/Payloads/ListObjectsPayload';
import { IsBoolean, IsOptional } from 'class-validator';

class ListObjectsRequest implements ListObjectsPayload
{
    @IsOptional()
    @IsBoolean()
    recursive: string;

    @IsOptional()
    @IsBoolean()
    prefix: string;

    constructor(data: Record<string, any>)
    {
        this.recursive = data.recursive ? String(data.recursive) : undefined;
        this.prefix = data.prefix ? String(data.prefix) : undefined;
    }

    getRecursive(): boolean
    {
        return (this.recursive?.toLowerCase() === 'true');
    }

    getPrefix(): string
    {
        return this.prefix;
    }
}

export default ListObjectsRequest;
