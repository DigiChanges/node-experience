import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IUserService from '../../InterfaceAdapters/IUserService';

class RemoveUserUseCase
{
    @containerFactory(SERVICES.IUserService)
    private userService: IUserService;

    async handle(payload: IdPayload): Promise<any>
    {
        const id = payload.getId();
        return await this.userService.remove(id);
    }
}

export default RemoveUserUseCase;
