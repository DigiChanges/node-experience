import FileOptionsQueryPayload from './FileOptionsQueryPayload';

interface PresignedFileRepPayload extends FileOptionsQueryPayload
{
    name: string,
    expiry: number,
}

export default PresignedFileRepPayload;
