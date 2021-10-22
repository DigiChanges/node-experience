import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';

class GetUserUseCase
{
    @containerFactory(SERVICES.IUserService)
    private user_service: UserService;

    async handle(payload: IdPayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        return await this.user_service.getOne(id);
    }
}

export default GetUserUseCase;
