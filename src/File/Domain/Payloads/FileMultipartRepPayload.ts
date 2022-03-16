import FileOptionsQueryPayload from './FileOptionsQueryPayload';
import FileRepPayload from './FileRepPayload';

interface FileMultipartRepPayload extends FileRepPayload, FileOptionsQueryPayload
{
    file: any; // TODO: Add interface
}

export default FileMultipartRepPayload;
