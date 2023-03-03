import UserRepPayload from '../User/UserRepPayload';
import IUserDomain from '../../Entities/IUserDomain';

interface UpdateMePayload extends UserRepPayload
{
    authUser: IUserDomain;
}

export default UpdateMePayload;
