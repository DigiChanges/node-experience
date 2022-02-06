import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import FileMultipartRepPayload from './FileMultipartRepPayload';

interface FileUpdateMultipartPayload extends IdPayload, FileMultipartRepPayload {}

export default FileUpdateMultipartPayload;
