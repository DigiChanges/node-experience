import IFileVersionOptimizeDTO from '../Payloads/IFileVersionOptimizeDTO';
import IFileVersionPayload from '../Entities/IFileVersionPayload';
import IFileVersionDomain from '../Entities/IFileVersionDomain';

class FileVersionOptimizeDTO implements IFileVersionOptimizeDTO
{
    private readonly _file: IFileVersionPayload;
    private readonly _lastVersion: IFileVersionDomain;

    constructor(_file: IFileVersionPayload, _lastVersion: IFileVersionDomain)
    {
        this._file = _file;
        this._lastVersion = _lastVersion;
    }

    get extension(): string
    {
        return 'webp';
    }

    get file(): IFileVersionPayload
    {
        return this._file;
    }

    get isImage(): boolean
    {
        return true;
    }

    get isPublic(): boolean
    {
        return this._lastVersion.isPublic;
    }

    get mimeType(): string
    {
        return this._file.mimeType;
    }

    get originalName(): string
    {
        return this._file.originalName;
    }

    get path(): string
    {
        return '/';
    }

    get size(): number
    {
        return this._lastVersion.size;
    }
}

export default FileVersionOptimizeDTO;
