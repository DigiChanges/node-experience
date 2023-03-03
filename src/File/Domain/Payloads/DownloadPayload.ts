import VersionPayload from './VersionPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';

interface DownloadPayload extends VersionPayload, IdPayload {}

export default DownloadPayload;
