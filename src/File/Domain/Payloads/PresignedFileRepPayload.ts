import FileOptionsQueryPayload from './FileOptionsQueryPayload';
import VersionPayload from './VersionPayload';

interface PresignedFileRepPayload extends FileOptionsQueryPayload, VersionPayload
{
    file: string,
    expiry: number,
}

export default PresignedFileRepPayload;
