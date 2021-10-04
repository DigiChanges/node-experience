import UserUpdatePayload from '../../InterfaceAdapters/Payloads/UserUpdatePayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';

class UpdateUserUseCase
{
    private userService = new UserService();

    async handle(payload: UserUpdatePayload): Promise<IUserDomain>
    {
        return await this.userService.update(payload);
    }

}

export default UpdateUserUseCase;
