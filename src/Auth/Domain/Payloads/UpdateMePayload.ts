import UserRepPayload from '../../../User/Domain/Payloads/UserRepPayload';
import IUserDomain from '../../../User/Domain/Entities/IUserDomain';

interface UpdateMePayload extends UserRepPayload
{
    authUser: IUserDomain;
}

export default UpdateMePayload;
