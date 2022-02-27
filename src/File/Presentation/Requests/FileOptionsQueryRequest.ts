import { IsBoolean, IsOptional } from 'class-validator';
import FileOptionsQueryPayload from '../../Domain/Payloads/FileOptionsQueryPayload';
import { decorate } from 'ts-mixer';

class FileOptionsQueryRequest implements FileOptionsQueryPayload
{
    @decorate(IsBoolean())
    @decorate(IsOptional())
    hasOriginalName: boolean;

    @decorate(IsBoolean())
    @decorate(IsOptional())
    isPublic: boolean;

    @decorate(IsBoolean())
    @decorate(IsOptional())
    isOverwrite: boolean;

    constructor({ query }: any)
    {
        this.hasOriginalName = query?.hasOriginalName === 'true';
        this.isPublic = query?.isPublic === 'true';
        this.isOverwrite = query?.isOverwrite === 'true';
    }

    getIsOriginalName(): boolean
    {
        return this.hasOriginalName;
    }

    getIsPublic(): boolean
    {
        return this.isPublic;
    }

    getIsOverwrite(): boolean
    {
        return this.isOverwrite;
    }
}

export default FileOptionsQueryRequest;
