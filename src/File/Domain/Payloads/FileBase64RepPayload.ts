import FilePayload from './FilePayload';

interface FileBase64RepPayload extends Omit<FilePayload, 'isOptimized' | 'name' | 'objectPath' | 'version'>
{
    base64: string,
}

export default FileBase64RepPayload;
