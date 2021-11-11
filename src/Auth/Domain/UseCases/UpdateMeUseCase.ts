import UserRepPayload from '../../../User/InterfaceAdapters/Payloads/UserRepPayload';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IUserService from '../../../User/InterfaceAdapters/IUserService';

class UpdateMeUseCase
{
    @containerFactory(SERVICES.IUserService)
    private userService: IUserService;

    async handle(payload: UserRepPayload, authUser: IUserDomain): Promise<IUserDomain>
    {
        return await this.userService.persist(authUser, payload);
    }
}

export default UpdateMeUseCase;
