import IdPayload from '../../../App/InterfaceAdapters/Payloads/IdPayload';
import IRoleRepository from '../../InterfaceAdapters/IRoleRepository';
import {REPOSITORIES} from '../../../repositories';
import {containerFactory} from '../../../App/Infrastructure/Factories/ContainerFactory';

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
