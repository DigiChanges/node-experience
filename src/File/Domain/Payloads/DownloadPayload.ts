import VersionPayload from './VersionPayload';
import { IdPayload } from '@digichanges/shared-experience';

interface DownloadPayload extends VersionPayload, IdPayload {}

export default DownloadPayload;
