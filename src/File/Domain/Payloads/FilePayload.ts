import FileRepPayload from './FileRepPayload';
import FileOptionsQueryPayload from './FileOptionsQueryPayload';

interface FilePayload extends FileRepPayload, FileOptionsQueryPayload {}

export default FilePayload;
