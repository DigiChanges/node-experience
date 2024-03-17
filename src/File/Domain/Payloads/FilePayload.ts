import FileRepPayload from './FileRepPayload';
import FileOptionsQueryPayload from './FileOptionsQueryPayload';

interface FilePayload extends FileRepPayload
{
    query: FileOptionsQueryPayload;
}

export default FilePayload;
