import FileMultipartRepPayload from './FileMultipartRepPayload';
import { IdPayload } from '../../../Main/Domain/Payloads/IdPayload';

interface FileUpdateMultipartPayload extends IdPayload, FileMultipartRepPayload {}

export default FileUpdateMultipartPayload;
