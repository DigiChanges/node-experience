import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import UserService from '../Services/UserService';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';

class ListUsersUseCase
{
    @containerFactory(SERVICES.IUserService)
    private user_service: UserService;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.user_service.list(payload);
    }
}

export default ListUsersUseCase;
