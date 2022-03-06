import UserRepPayload from '../../../User/Domain/Payloads/UserRepPayload';
import IUserDomain from '../../../User/Domain/Entities/IUserDomain';
import UserService from '../../../User/Domain/Services/UserService';

class UpdateMeUseCase
{
    private userService = new UserService();

    async handle(payload: UserRepPayload, authUser: IUserDomain): Promise<IUserDomain>
    {
        return await this.userService.persist(authUser, payload);
    }
}

export default UpdateMeUseCase;
