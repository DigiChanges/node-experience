import FilePayload from './FilePayload';

interface FileBase64RepPayload extends FilePayload
{
    base64: string,
}

export default FileBase64RepPayload;
