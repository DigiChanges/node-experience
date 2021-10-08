import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';

class GetUserUseCase
{
    private user_service = new UserService();

    async handle(payload: IdPayload): Promise<IUserDomain>
    {
        const id = payload.get_id();
        return await this.user_service.get_one(id);
    }
}

export default GetUserUseCase;
