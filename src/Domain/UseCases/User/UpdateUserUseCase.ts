import { lazyInject } from '../../../inversify.config'
import IUser from "../../../InterfaceAdapters/IEntities/IUser";
import UserUpdatePayload from "../../../InterfaceAdapters/Payloads/Users/UserUpdatePayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import CheckUserRolePayload from "../../../InterfaceAdapters/Payloads/Auxiliars/CheckUserRolePayload";
import Roles from "../../../../config/Roles";
import ErrorException from "../../../Lib/ErrorException";
import StatusCode from "../../../Presentation/Shared/StatusCode";
import IRoleRepository from "../../../InterfaceAdapters/IRepositories/IRoleRepository";
import RoleRepoFactory from "../../../Infrastructure/Factories/RoleRepoFactory";
import Role from "../../../Infrastructure/Entities/Role";
import {REPOSITORIES} from "../../../repositories";

class UpdateUserUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: UserUpdatePayload): Promise<IUser>
    {
        const id = payload.id();
        const user: IUser = await this.repository.findOne(id);
        const enable = payload.enable();

        if(typeof user.roles !== 'undefined' && enable !== null){
            let checkRole: CheckUserRolePayload = {
                roleToCheck: Roles.SUPER_ADMIN.toLocaleLowerCase(),
                user
            }
            const verifyRole = await this.checkIfUserHasRole(checkRole);
            if(verifyRole && !enable){
                throw new ErrorException(StatusCode.HTTP_FORBIDDEN, "SuperAdmin can't be disable");
            }
        }

        user.firstName = payload.firstName();
        user.lastName = payload.lastName();

        if(enable !== null){
            user.enable = enable;
        }

        user.email = payload.email();

        await this.repository.save(user);

        return user;
    }

    public async checkIfUserHasRole (payload: CheckUserRolePayload): Promise<boolean>
    {
        let roleRepository: IRoleRepository = RoleRepoFactory.create();
        let count = payload.user.roles.length;

        for (let i = 0; i < count; i++)
        {
            const role: Role = await roleRepository.findOne(payload.user.roles[i]);
            if(role.slug === payload.roleToCheck){
                return true;
            }
        }
        return false;
    }
}

export default UpdateUserUseCase;
