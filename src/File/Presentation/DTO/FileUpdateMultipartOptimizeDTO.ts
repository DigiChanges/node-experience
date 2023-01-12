import IFileVersionPayload from '../../Domain/Entities/IFileVersionPayload';
import FileUpdateMultipartPayload from '../../Domain/Payloads/FileUpdateMultipartPayload';
import FileMultipartOptimizeDTO from './FileMultipartOptimizeDTO';
import FileOptionsQueryPayload from '../../Domain/Payloads/FileOptionsQueryPayload';

class FileUpdateMultipartOptimizeDTO extends FileMultipartOptimizeDTO implements FileUpdateMultipartPayload
{
    private readonly _id: string;

    constructor(fileVersion: IFileVersionPayload, query: FileOptionsQueryPayload)
    {
        super(fileVersion, query);
        this._id = fileVersion._id;
    }

    get id(): string
    {
        return this._id;
    }
}

export default FileUpdateMultipartOptimizeDTO;
