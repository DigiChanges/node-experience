import IdPayload from '../../../InterfaceAdapters/Payloads/Defaults/IdPayload';
import IRoleRepository from '../../../InterfaceAdapters/IRepositories/IRoleRepository';
import {REPOSITORIES} from '../../../repositories';
import ContainerFactory from '../../../Infrastructure/Factories/ContainerFactory';

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
