import UserAssignRoleByPayload from "../../../InterfaceAdapters/Payloads/Users/UserAssignRoleByPayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import {REPOSITORIES} from "../../../repositories";
import IUserDomain from "../../../InterfaceAdapters/IDomain/IUserDomain";
import IRoleRepository from "../../../InterfaceAdapters/IRepositories/IRoleRepository";
import IRoleDomain from "../../../InterfaceAdapters/IDomain/IRoleDomain";
import ContainerFactory from "../../../Infrastructure/Factories/ContainerFactory";

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

        let user: IUserDomain = await this.repository.getOneByEmail(email);
        let role: IRoleDomain = await this.roleRepository.getBySlug(slug);

        user.setRole(role);

        return await this.repository.save(user);
    }
}

export default AssignRoleBySlugUseCase;
