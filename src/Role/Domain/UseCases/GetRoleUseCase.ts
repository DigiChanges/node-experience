import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IRoleRepository from '../../InterfaceAdapters/IRoleRepository';
import { REPOSITORIES } from '../../../Config/repositories';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';

class GetRoleUseCase
{
    @containerFactory(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    async handle(payload: IdPayload): Promise<IRoleDomain>
    {
        const id = payload.getId();
        return await this.repository.getOne(id);
    }
}

export default GetRoleUseCase;
