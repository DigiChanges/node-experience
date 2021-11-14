import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IUserService from '../../InterfaceAdapters/IUserService';

class ListUsersUseCase
{
    @containerFactory(SERVICES.IUserService)
    private userService: IUserService;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.userService.list(payload);
    }
}

export default ListUsersUseCase;
