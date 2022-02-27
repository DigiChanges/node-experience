import FileOptionsQueryPayload from './FileOptionsQueryPayload';
import FileRepPayload from './FileRepPayload';

interface FileMultipartRepPayload extends FileRepPayload, FileOptionsQueryPayload
{
    getFile(): any;
}

export default FileMultipartRepPayload;
