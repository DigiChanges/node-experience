import FileOptionsQueryPayload from './FileOptionsQueryPayload';
import FileRepPayload from './FileRepPayload';
import IFileMultipart from '../Entities/IFileMultipart';

interface FileMultipartRepPayload extends FileRepPayload, FileOptionsQueryPayload
{
    file: IFileMultipart;
}

export default FileMultipartRepPayload;
