import IdPayload from '../../../App/InterfaceAdapters/Payloads/IdPayload';
import FileMultipartRepPayload from './FileMultipartRepPayload';

interface FileUpdateMultipartPayload extends IdPayload, FileMultipartRepPayload {}

export default FileUpdateMultipartPayload;