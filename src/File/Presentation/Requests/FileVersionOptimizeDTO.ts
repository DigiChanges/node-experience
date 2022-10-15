import IFileVersionOptimizeDTO from '../../Domain/Payloads/IFileVersionOptimizeDTO';
import IFileMultipart from '../../Domain/Entities/IFileMultipart';
import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';

class FileVersionOptimizeDTO implements IFileVersionOptimizeDTO
{
    private readonly _file: IFileMultipart;
    private readonly _lastVersion: IFileVersionDomain;

    constructor(_file: IFileMultipart, _lastVersion: IFileVersionDomain)
    {
        this._file = _file;
        this._lastVersion = _lastVersion;
    }
    get extension(): string
    {
        return 'webp';
    }

    get file(): IFileMultipart
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
        return this._file.mimetype;
    }

    get originalName(): string
    {
        return this._file.originalname;
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
