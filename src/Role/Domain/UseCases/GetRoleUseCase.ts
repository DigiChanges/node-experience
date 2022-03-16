import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IRoleDomain from '../Entities/IRoleDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import IRoleRepository from '../../Infrastructure/Repositories/IRoleRepository';

class GetRoleUseCase
{
    @containerFactory(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    async handle(payload: IdPayload): Promise<IRoleDomain>
    {
        return await this.repository.getOne(payload.id);
    }
}

export default GetRoleUseCase;
