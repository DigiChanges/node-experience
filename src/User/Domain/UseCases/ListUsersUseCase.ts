import {ICriteria, IPaginator} from '@digichanges/shared-experience';
import IUserRepository from '../../InterfaceAdapters/IUserRepository';
import {REPOSITORIES} from '../../../repositories';
import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';

class ListUsersUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default ListUsersUseCase;
