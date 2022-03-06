import FileOptionsQueryPayload from './FileOptionsQueryPayload';
import FileRepPayload from './FileRepPayload';

interface FileBase64RepPayload extends FileRepPayload, FileOptionsQueryPayload
{
    base64: string,
}

export default FileBase64RepPayload;
