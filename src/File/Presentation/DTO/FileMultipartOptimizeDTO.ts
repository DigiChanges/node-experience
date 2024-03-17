import FileMultipartRepPayload from '../../Domain/Payloads/FileMultipartRepPayload';
import IFileVersionPayload from '../../Domain/Entities/IFileVersionPayload';
import FileOptionsQueryPayload from '../../Domain/Payloads/FileOptionsQueryPayload';

class FileMultipartOptimizeDTO implements FileMultipartRepPayload
{
    readonly file: IFileVersionPayload;
    readonly query: FileOptionsQueryPayload;

    constructor(file: IFileVersionPayload, query: FileOptionsQueryPayload)
    {
        this.file = file;
        this.query = query;
    }
}

export default FileMultipartOptimizeDTO;
