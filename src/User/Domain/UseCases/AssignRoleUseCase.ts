import UserAssignRolePayload from '../Payloads/UserAssignRolePayload';
import IUserDomain from '../Entities/IUserDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import IUserRepository from '../../Infrastructure/Repositories/IUserRepository';
import IRoleRepository from '../../../Role/Infrastructure/Repositories/IRoleRepository';

class AssignRoleUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    @containerFactory(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository;

    async handle(payload: UserAssignRolePayload): Promise<IUserDomain>
    {
        const { id } = payload;
        const user: IUserDomain = await this.repository.getOne(id);

        user.clearRoles();

        const roles = await this.roleRepository.getInBy({ _id: payload.rolesId });

        roles.forEach(role => user.setRole(role));

        return await this.repository.save(user);
    }
}

export default AssignRoleUseCase;
