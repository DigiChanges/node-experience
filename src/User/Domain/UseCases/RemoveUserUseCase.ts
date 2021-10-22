import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import UserService from '../Services/UserService';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';

class RemoveUserUseCase
{
    @containerFactory(SERVICES.IUserService)
    private userService: UserService;

    async handle(payload: IdPayload): Promise<any>
    {
        const id = payload.getId();
        return await this.userService.remove(id);
    }
}

export default RemoveUserUseCase;
