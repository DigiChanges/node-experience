import FileRepPayload from './FileRepPayload';

interface FileMultipartRepPayload extends FileRepPayload
{
    getFile(): any
}

export default FileMultipartRepPayload;
