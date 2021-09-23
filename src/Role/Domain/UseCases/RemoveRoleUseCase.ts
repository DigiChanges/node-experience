import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IRoleRepository from '../../InterfaceAdapters/IRoleRepository';
import { REPOSITORIES } from '../../../Config/repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';

class RemoveRoleUseCase
{
    @containerFactory(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    async handle(payload: IdPayload): Promise<any>
    {
        const id = payload.getId();
        return await this.repository.delete(id);
    }
}

export default RemoveRoleUseCase;
