import { IBaseDomain } from '@digichanges/shared-experience';
import UserUpdateRepPayload from '../Payloads/User/UserUpdateRepPayload';
import UserRepPayload from '../Payloads/User/UserRepPayload';

interface IUserDomain extends IBaseDomain, UserRepPayload
{
    updateRep(payload: UserUpdateRepPayload): void;
}

export default IUserDomain;
