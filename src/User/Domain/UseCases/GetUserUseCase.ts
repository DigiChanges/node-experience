import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IUserDomain from '../Entities/IUserDomain';
import UserService from '../Services/UserService';

class GetUserUseCase
{
    private userService = new UserService();

    async handle(payload: IdPayload): Promise<IUserDomain>
    {
        const id = payload.id;
        return await this.userService.getOne(id);
    }
}

export default GetUserUseCase;
