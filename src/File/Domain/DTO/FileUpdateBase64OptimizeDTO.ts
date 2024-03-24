import FileBase64OptimizeDTO from './FileBase64OptimizeDTO';
import FileUpdateBase64Payload from '../Payloads/FileUpdateBase64Payload';

class FileUpdateBase64OptimizeDTO extends FileBase64OptimizeDTO implements FileUpdateBase64Payload
{
    readonly #_id: string;

    constructor(fileRequest: FileUpdateBase64Payload)
    {
        super(fileRequest);
        this.#_id = fileRequest.id;
    }

    get id(): string
    {
        return this.#_id;
    }
}

export default FileUpdateBase64OptimizeDTO;
