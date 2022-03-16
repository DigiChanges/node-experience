import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import RoleRepPayload from './RoleRepPayload';

interface RoleUpdatePayload extends IdPayload, RoleRepPayload {}

export default RoleUpdatePayload;
