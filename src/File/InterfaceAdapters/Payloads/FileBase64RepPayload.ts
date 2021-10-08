import FileRepPayload from './FileRepPayload';

interface FileBase64RepPayload extends FileRepPayload
{
    get_base64(): string,
}

export default FileBase64RepPayload;
