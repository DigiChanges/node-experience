import FileMultipartRepPayload from './Payloads/FileMultipartRepPayload';
import IFileMultipart from './Entities/IFileMultipart';

class FileMultipartOptimizeDTO implements FileMultipartRepPayload
{
    private readonly _req: FileMultipartRepPayload;
    private readonly _file: IFileMultipart;

    constructor(fileRequest: FileMultipartRepPayload, _file: IFileMultipart)
    {
        this._req = fileRequest;
        this._file = _file;
    }

    get extension(): string
    {
        return 'webp';
    }

    get file(): IFileMultipart
    {
        return this._file;
    }
    get isOptimize(): boolean
    {
        return this._req.isOptimize;
    }
    get isOriginalName(): boolean
    {
        return this._req.isOriginalName;
    }
    get isOverwrite(): boolean
    {
        return this._req.isOverwrite;
    }
    get isPublic(): boolean
    {
        return this._req.isPublic;
    }
    get mimeType(): string
    {
        return 'image/webp';
    }
    get originalName(): string
    {
        return this._req.originalName.replace(this._req.extension, 'webp');
    }
    get path(): string
    {
        return '/';
    }
    get size(): number
    {
        return this._req.size;
    }

    get isImage(): boolean
    {
        return this._req.isImage;
    }
}

export default FileMultipartOptimizeDTO;
