import FileOptionsQueryPayload from '../Payloads/FileOptionsQueryPayload';
import FileBase64RepPayload from '../Payloads/FileBase64RepPayload';

class FileBase64OptimizeDTO implements FileBase64RepPayload
{
    #_req: FileBase64RepPayload;
    readonly #_base64: string;
    query: FileOptionsQueryPayload;

    constructor(fileRequest: FileBase64RepPayload)
    {
        this.#_req = fileRequest;
        this.#_base64 = fileRequest.base64;
    }

    get extension(): string
    {
        return 'webp';
    }

    get base64(): string
    {
        return this.#_base64;
    }

    get isOptimize(): boolean
    {
        return this.#_req.query.isOptimize;
    }

    get isOriginalName(): boolean
    {
        return this.#_req.query.isOriginalName;
    }

    get isOverwrite(): boolean
    {
        return this.#_req.query.isOverwrite;
    }

    get isPublic(): boolean
    {
        return this.#_req.isPublic;
    }

    get mimeType(): string
    {
        return 'image/webp';
    }

    get originalName(): string
    {
        return this.#_req.originalName.replace(this.#_req.extension, 'webp');
    }

    get path(): string
    {
        return '/';
    }

    get size(): number
    {
        return this.#_req.size;
    }

    get isImage(): boolean
    {
        return this.#_req.isImage;
    }
}

export default FileBase64OptimizeDTO;
