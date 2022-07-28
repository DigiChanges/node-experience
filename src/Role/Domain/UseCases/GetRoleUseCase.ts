import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IRoleDomain from '../Entities/IRoleDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IRoleRepository from '../../Infrastructure/Repositories/IRoleRepository';
import { getRequestContext } from '../../../App/Presentation/Shared/RequestContext';

class GetRoleUseCase
{
    private repository: IRoleRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: IdPayload): Promise<IRoleDomain>
    {
        return await this.repository.getOne(payload.id);
    }
}

export default GetRoleUseCase;
