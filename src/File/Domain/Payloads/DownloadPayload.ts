import VersionPayload from './VersionPayload';
import { IdPayload } from '../../../Main/Domain/Payloads/IdPayload';

interface DownloadPayload extends VersionPayload, IdPayload {}

export default DownloadPayload;
