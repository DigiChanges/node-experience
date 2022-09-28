import FileMultipartRepPayload from './Payloads/FileMultipartRepPayload';

class FileMultipartOptimizeRequestAdapter implements FileMultipartRepPayload
{
    private readonly _req: FileMultipartRepPayload;
    private readonly _file: any;

    constructor(fileRequest: FileMultipartRepPayload, _file: any)
    {
        this._req = fileRequest;
        this._file = _file;
    }

    get extension(): string
    {
        return 'webp';
    }

    get file(): any
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
}

export default FileMultipartOptimizeRequestAdapter;
