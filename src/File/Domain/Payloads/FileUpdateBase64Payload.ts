import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import FileBase64RepPayload from './FileBase64RepPayload';

interface FileUpdateBase64Payload extends IdPayload, FileBase64RepPayload {}

export default FileUpdateBase64Payload;
