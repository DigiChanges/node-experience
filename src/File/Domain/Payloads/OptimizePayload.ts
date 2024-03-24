import FileOptionsQueryPayload from './FileOptionsQueryPayload';
import { IdPayload } from '../../../Main/Domain/Payloads/IdPayload';

interface OptimizePayload extends IdPayload, FileOptionsQueryPayload {}

export default OptimizePayload;
