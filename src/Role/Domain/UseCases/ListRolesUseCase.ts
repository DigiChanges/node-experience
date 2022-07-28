import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import { REPOSITORIES } from '../../../Config/Injects';
import IRoleRepository from '../../Infrastructure/Repositories/IRoleRepository';
import { getRequestContext } from '../../../App/Presentation/Shared/RequestContext';

class ListRolesUseCase
{
    private repository: IRoleRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default ListRolesUseCase;
