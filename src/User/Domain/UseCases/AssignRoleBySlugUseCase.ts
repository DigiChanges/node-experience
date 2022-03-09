import UserAssignRoleBySlug from '../Payloads/UserAssignRoleBySlug';
import IUserDomain from '../Entities/IUserDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import IUserRepository from '../../Infrastructure/Repositories/IUserRepository';
import IRoleRepository from '../../../Role/Infrastructure/Repositories/IRoleRepository';

class AssignRoleBySlugUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    @containerFactory(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository;

    async handle(payload: UserAssignRoleBySlug): Promise<IUserDomain>
    {
        const { email, slugRole } = payload;

        const [user, role] = await Promise.all([
            this.repository.getOneByEmail(email),
            await this.roleRepository.getBySlug(slugRole)
        ]);

        user.setRole(role);

        return await this.repository.save(user);
    }
}

export default AssignRoleBySlugUseCase;
