import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import UserService from '../Services/UserService';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';

class ListUsersUseCase
{
    @containerFactory(SERVICES.IUserService)
    private userService: UserService;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.userService.list(payload);
    }
}

export default ListUsersUseCase;
