import IFileMultipart from '../../Domain/Entities/IFileMultipart';
import FileUpdateMultipartPayload from '../../Domain/Payloads/FileUpdateMultipartPayload';
import FileMultipartOptimizeDTO from './FileMultipartOptimizeDTO';

class FileUpdateMultipartOptimizeDTO extends FileMultipartOptimizeDTO implements FileUpdateMultipartPayload
{
    private readonly _id: string;

    constructor(fileRequest: FileUpdateMultipartPayload, _file: IFileMultipart)
    {
        super(fileRequest, _file);
        this._id = fileRequest.id;
    }

    get id(): string
    {
        return this._id;
    }
}

export default FileUpdateMultipartOptimizeDTO;
