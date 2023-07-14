import { IdPayload } from '@digichanges/shared-experience';
import UserRepPayload from './UserRepPayload';

interface UserUpdatePayload extends IdPayload, UserRepPayload
{
    userId: string;
}

export default UserUpdatePayload;

