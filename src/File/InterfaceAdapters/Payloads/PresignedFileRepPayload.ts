import FileOptionsQueryPayload from './FileOptionsQueryPayload';

interface PresignedFileRepPayload extends FileOptionsQueryPayload
{
    getName(): string,
    getExpiry(): number,
}

export default PresignedFileRepPayload;
