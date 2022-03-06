import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IUserDomain from '../Entities/IUserDomain';
import UserService from '../Services/UserService';

class RemoveUserUseCase
{
    private userService = new UserService();

    async handle(payload: IdPayload): Promise<IUserDomain>
    {
        const id = payload.id;
        return await this.userService.remove(id);
    }
}

export default RemoveUserUseCase;
