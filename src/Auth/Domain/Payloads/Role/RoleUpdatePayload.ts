import { IdPayload } from '@digichanges/shared-experience';
import RoleRepPayload from './RoleRepPayload';

interface RoleUpdatePayload extends IdPayload, RoleRepPayload {}

export default RoleUpdatePayload;
