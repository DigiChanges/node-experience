import { IdPayload } from '@digichanges/shared-experience';
import PermissionRepPayload from './PermissionRepPayload';

interface PermissionUpdatePayload extends IdPayload, PermissionRepPayload {}

export default PermissionUpdatePayload;
