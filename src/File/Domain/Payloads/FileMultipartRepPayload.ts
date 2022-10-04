import IFileMultipart from '../Entities/IFileMultipart';
import FilePayload from './FilePayload';

interface FileMultipartRepPayload extends FilePayload
{
    file: IFileMultipart;
}

export default FileMultipartRepPayload;
