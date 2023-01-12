import FileBase64OptimizeDTO from './FileBase64OptimizeDTO';
import FileUpdateBase64Payload from '../../Domain/Payloads/FileUpdateBase64Payload';

class FileUpdateBase64OptimizeDTO extends FileBase64OptimizeDTO implements FileUpdateBase64Payload
{
    private readonly _id: string;

    constructor(fileRequest: FileUpdateBase64Payload, _base64: string)
    {
        super(fileRequest, _base64);
        this._id = fileRequest.id;
    }

    get id(): string
    {
        return this._id;
    }
}

export default FileUpdateBase64OptimizeDTO;
