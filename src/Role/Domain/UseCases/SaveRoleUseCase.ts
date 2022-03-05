import RoleRepPayload from '../Payloads/RoleRepPayload';
import IRoleDomain from '../Entities/IRoleDomain';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import IRoleRepository from '../../Infrastructure/Repositories/IRoleRepository';
import Role from '../Entities/Role';

class SaveRoleUseCase
{
    @containerFactory(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    async handle(payload: RoleRepPayload): Promise<IRoleDomain>
    {
        const role = new Role(payload);

        return await this.repository.save(role);
    }
}

export default SaveRoleUseCase;
