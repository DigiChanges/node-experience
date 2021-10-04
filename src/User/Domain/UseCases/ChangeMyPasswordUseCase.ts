import ChangeMyPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeMyPasswordPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';

class ChangeMyPasswordUseCase
{
    private userService = new UserService();

    async handle(payload: ChangeMyPasswordPayload): Promise<IUserDomain>
    {
        return await this.userService.changeMyPassword(payload);
    }
}

export default ChangeMyPasswordUseCase;
