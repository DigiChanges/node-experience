import ChangeUserPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeUserPasswordPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';

class ChangeUserPasswordUseCase
{
    private userService = new UserService();

    async handle(payload: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        return await this.userService.changeUserPassword(payload);
    }
}

export default ChangeUserPasswordUseCase;
