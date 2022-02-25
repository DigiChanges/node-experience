import FileOptionsQueryPayload from './FileOptionsQueryPayload';
import FileRepPayload from './FileRepPayload';

interface FileBase64RepPayload extends FileRepPayload, FileOptionsQueryPayload
{
    getBase64(): string,
}

export default FileBase64RepPayload;
