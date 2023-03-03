import IFileVersionPayload from '../Entities/IFileVersionPayload';
import FileOptionsQueryPayload from './FileOptionsQueryPayload';

interface FileMultipartRepPayload
{
    file: IFileVersionPayload;
    query: FileOptionsQueryPayload;
}

export default FileMultipartRepPayload;
