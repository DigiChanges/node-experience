import { IdPayload } from '@digichanges/shared-experience';
import FileMultipartRepPayload from './FileMultipartRepPayload';

interface FileUpdateMultipartPayload extends IdPayload, FileMultipartRepPayload {}

export default FileUpdateMultipartPayload;
