import FileRepPayload from './FileRepPayload';

interface FileBase64RepPayload extends FileRepPayload
{
    getBase64(): string,
}

export default FileBase64RepPayload;