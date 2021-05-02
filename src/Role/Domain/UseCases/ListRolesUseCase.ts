import {ICriteria, IPaginator} from '@digichanges/shared-experience';

import IRoleRepository from '../../InterfaceAdapters/IRoleRepository';
import {REPOSITORIES} from '../../../repositories';
import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';

class ListRolesUseCase
{
    @containerFactory(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default ListRolesUseCase;
