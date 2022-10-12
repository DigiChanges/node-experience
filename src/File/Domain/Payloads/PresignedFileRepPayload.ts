import FileOptionsQueryPayload from './FileOptionsQueryPayload';

interface PresignedFileRepPayload extends FileOptionsQueryPayload
{
    file: string,
    expiry: number,
}

export default PresignedFileRepPayload;
