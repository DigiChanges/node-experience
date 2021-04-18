import UserAssignRoleByPayload from '../../InterfaceAdapters/Payloads/UserAssignRoleByPayload';
import IUserRepository from '../../InterfaceAdapters/IUserRepository';
import {REPOSITORIES} from '../../../repositories';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import IRoleRepository from '../../../Role/InterfaceAdapters/IRoleRepository';
import IRoleDomain from '../../../Role/InterfaceAdapters/IRoleDomain';
import ContainerFactory from '../../../App/Infrastructure/Factories/ContainerFactory';

class AssignRoleBySlugUseCase
{
    private repository: IUserRepository;
    private roleRepository: IRoleRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
        this.roleRepository = ContainerFactory.create<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: UserAssignRoleByPayload): Promise<IUserDomain>
    {
        const email = payload.getEmail();
        const slug = payload.getSlugRole();

        const user: IUserDomain = await this.repository.getOneByEmail(email);
        const role: IRoleDomain = await this.roleRepository.getBySlug(slug);

        user.setRole(role);

        return await this.repository.save(user);
    }
}

export default AssignRoleBySlugUseCase;
