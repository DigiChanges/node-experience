import ListObjectsPayload from '../../Domain/Payloads/ListObjectsPayload';
import { IsBoolean, IsOptional } from 'class-validator';
import FileOptionsQueryRequest from './FileOptionsQueryRequest';

class ListObjectsRequest extends FileOptionsQueryRequest implements ListObjectsPayload
{
    private readonly _recursive: string;
    private readonly _prefix: string;

    constructor(query: Record<string, any>)
    {
        super({ query });
        this._recursive = query.recursive ? String(query.recursive) : undefined;
        this._prefix = query.prefix ? String(query.prefix) : undefined;
    }

    @IsOptional()
    @IsBoolean()
    get recursive(): boolean
    {
        return (this._recursive?.toLowerCase() === 'true');
    }

    @IsOptional()
    @IsBoolean()
    get prefix(): string
    {
        return this._prefix;
    }
}

export default ListObjectsRequest;
