import ListObjectsPayload from '../../Domain/Payloads/ListObjectsPayload';
import { IsBoolean, IsOptional } from 'class-validator';
import FileOptionsQueryRequest from './FileOptionsQueryRequest';

class ListObjectsRequest extends FileOptionsQueryRequest implements ListObjectsPayload
{
    @IsOptional()
    @IsBoolean()
    recursive: string;

    @IsOptional()
    @IsBoolean()
    prefix: string;

    constructor(query: Record<string, any>)
    {
        super({ query });
        this.recursive = query.recursive ? String(query.recursive) : undefined;
        this.prefix = query.prefix ? String(query.prefix) : undefined;
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
