import FileMultipartRepPayload from '../Payloads/FileMultipartRepPayload';
import IFileVersionPayload from '../Entities/IFileVersionPayload';
import FileOptionsQueryPayload from '../Payloads/FileOptionsQueryPayload';

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
