import { IdPayload } from '@digichanges/shared-experience';
import UserPasswordRepPayload from './UserPasswordPayload';

interface ChangeUserPasswordPayload extends IdPayload, UserPasswordRepPayload {}

export default ChangeUserPasswordPayload;
