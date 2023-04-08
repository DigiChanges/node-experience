import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import UserRepPayload from '../Payloads/User/UserRepPayload';

interface IUserDomain extends IBaseDomain, UserRepPayload
{
    updateRep(payload: UserRepPayload): void;
}

export default IUserDomain;
