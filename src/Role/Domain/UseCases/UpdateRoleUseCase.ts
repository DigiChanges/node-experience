import RoleUpdatePayload from '../Payloads/RoleUpdatePayload';
import IRoleDomain from '../Entities/IRoleDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import IRoleRepository from '../../Infrastructure/Repositories/IRoleRepository';

class UpdateRoleUseCase
{
    @containerFactory(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    async handle(payload: RoleUpdatePayload): Promise<IRoleDomain>
    {
        const role: IRoleDomain = await this.repository.getOne(payload.id);
        role.updateBuild(payload);

        return await this.repository.update(role);
    }
}

export default UpdateRoleUseCase;
