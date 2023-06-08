import IdPayload from '../../../../../Shared/Presentation/Requests/IdPayload';
import PermissionRepPayload from './PermissionRepPayload';

interface PermissionUpdatePayload extends IdPayload, PermissionRepPayload {}

export default PermissionUpdatePayload;
