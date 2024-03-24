import IFileVersionPayload from '../Entities/IFileVersionPayload';
import FileUpdateMultipartPayload from '../Payloads/FileUpdateMultipartPayload';
import FileMultipartOptimizeDTO from './FileMultipartOptimizeDTO';
import FileOptionsQueryPayload from '../Payloads/FileOptionsQueryPayload';

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
