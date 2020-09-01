import { lazyInject } from '../../../inversify.config'
import UserUpdatePayload from "../../../InterfaceAdapters/Payloads/Users/UserUpdatePayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import CheckUserRolePayload from "../../../InterfaceAdapters/Payloads/Auxiliars/CheckUserRolePayload";
import Roles from "../../../../config/Roles";
import ErrorException from "../../../Application/Shared/ErrorException";
import StatusCode from "../../../Presentation/Shared/StatusCode";
import IRoleRepository from "../../../InterfaceAdapters/IRepositories/IRoleRepository";
import RoleRepoFactory from "../../../Infrastructure/Factories/RoleRepoFactory";
import Role from "../../../Infrastructure/Entities/TypeORM/Role";
import {REPOSITORIES} from "../../../repositories";
import IUserDomain from "../../../InterfaceAdapters/IDomain/IUserDomain";
import AuthService from "../../../Application/Services/AuthService";

class UpdateUserUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    @lazyInject(REPOSITORIES.IAuthService)
    private authService: AuthService;

    // constructor()
    // {
    //     authService = new AuthService();
    // }

    async handle(payload: UserUpdatePayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        const user: IUserDomain = await this.repository.getOne(id);
        let enable = payload.getEnable();

        if (payload.getTokenUserId() === user.getId())
        {
            enable = true;
        }

        if(typeof user.roles !== 'undefined' && enable !== null)
        {
            let checkRole: CheckUserRolePayload = {
                roleToCheck: Roles.SUPER_ADMIN.toLocaleLowerCase(),
                user
            }

            const verifyRole = await this.checkIfUserHasRole(checkRole);

            if(verifyRole && !enable)
            {
                throw new ErrorException(StatusCode.HTTP_FORBIDDEN, "SuperAdmin can't be disable");
            }
        }

        user.firstName = payload.getFirstName();
        user.lastName = payload.getLastName();

        user.email = payload.getEmail();

        await this.repository.save(user);

        return user;
    }

    public async checkIfUserHasRole (payload: CheckUserRolePayload): Promise<boolean>
    {
        let roleRepository: IRoleRepository = RoleRepoFactory.create();
        let count = payload.user.roles.length;

        for (let i = 0; i < count; i++)
        {
            const role: Role = await roleRepository.getOne(payload.user.roles[i].getId());

            if(role.slug === payload.roleToCheck)
            {
                return true;
            }
        }

        return false;
    }
}

export default UpdateUserUseCase;
