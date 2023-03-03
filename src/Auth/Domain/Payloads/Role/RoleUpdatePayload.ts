import IdPayload from '../../../../Shared/Presentation/Requests/IdPayload';
import RoleRepPayload from './RoleRepPayload';

interface RoleUpdatePayload extends IdPayload, RoleRepPayload {}

export default RoleUpdatePayload;
