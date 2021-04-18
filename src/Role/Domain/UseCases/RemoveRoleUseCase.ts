import IdPayload from '../../../App/InterfaceAdapters/Payloads/IdPayload';
import IRoleRepository from '../../InterfaceAdapters/IRoleRepository';
import {REPOSITORIES} from '../../../repositories';
import ContainerFactory from '../../../App/Infrastructure/Factories/ContainerFactory';

class RemoveRoleUseCase
{
    private repository: IRoleRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: IdPayload): Promise<any>
    {
        const id = payload.getId();
        return await this.repository.delete(id);
    }
}

export default RemoveRoleUseCase;
