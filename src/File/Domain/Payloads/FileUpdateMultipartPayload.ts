import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import FileMultipartRepPayload from './FileMultipartRepPayload';

interface FileUpdateMultipartPayload extends IdPayload, FileMultipartRepPayload {}

export default FileUpdateMultipartPayload;
