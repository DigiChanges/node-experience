import UserAssignRolePayload from "../../../InterfaceAdapters/Payloads/Users/UserAssignRolePayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import {REPOSITORIES} from "../../../repositories";
import IUserDomain from "../../../InterfaceAdapters/IDomain/IUserDomain";
import IRoleRepository from "../../../InterfaceAdapters/IRepositories/IRoleRepository";
import ContainerFactory from "../../../Infrastructure/Factories/ContainerFactory";

class AssignRoleUseCase
{
    private repository: IUserRepository;
    private roleRepository: IRoleRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
        this.roleRepository = ContainerFactory.create<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: UserAssignRolePayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        let user: IUserDomain = await this.repository.getOne(id);

        user.clearRoles();

        for await (const roleId of payload.getRolesId())
        {
            const role = await this.roleRepository.getOne(roleId);
            user.setRole(role);
        }

        return await this.repository.save(user);
    }
}

export default AssignRoleUseCase;
