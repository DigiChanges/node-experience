import ChangeUserPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeUserPasswordPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';

class ChangeUserPasswordUseCase
{
    private user_service = new UserService();

    async handle(payload: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        const id = payload.get_id();
        const user: IUserDomain = await this.user_service.get_one(id);

        return await this.user_service.persist_password(user, payload);
    }
}

export default ChangeUserPasswordUseCase;
