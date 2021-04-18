import IdPayload from '../../../App/InterfaceAdapters/Payloads/IdPayload';
import IRoleRepository from '../../InterfaceAdapters/IRoleRepository';
import {REPOSITORIES} from '../../../repositories';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import ContainerFactory from '../../../App/Infrastructure/Factories/ContainerFactory';

class GetRoleUseCase
{
    private repository: IRoleRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: IdPayload): Promise<IRoleDomain>
    {
        const id = payload.getId();
        return await this.repository.getOne(id);
    }
}

export default GetRoleUseCase;
