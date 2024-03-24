import FileBase64RepPayload from './FileBase64RepPayload';
import { IdPayload } from '../../../Main/Domain/Payloads/IdPayload';

interface FileUpdateBase64Payload extends IdPayload, FileBase64RepPayload {}

export default FileUpdateBase64Payload;
