import IdPayload from '../Defaults/IdPayload';
import FileMultipartRepPayload from './FileMultipartRepPayload';

interface FileUpdateMultipartPayload extends IdPayload, FileMultipartRepPayload {}

export default FileUpdateMultipartPayload;