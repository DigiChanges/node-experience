import { IBaseDomain } from '@digichanges/shared-experience';
import UserRepPayload from '../Payloads/User/UserRepPayload';

interface IUserDomain extends IBaseDomain, UserRepPayload
{
    updateRep(payload: UserRepPayload): void;
}

export default IUserDomain;
