import { IdPayload } from '@digichanges/shared-experience';
import UserPasswordRepPayload from './UserPasswordPayload';

interface ChangeMyPasswordPayload extends IdPayload, UserPasswordRepPayload
{
    currentPassword: string;
}

export default ChangeMyPasswordPayload;
