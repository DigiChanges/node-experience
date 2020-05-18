import User from '../Entities/User';
import {inject, injectable} from 'inversify';
import UserRepPayload from "../Payloads/Users/UserRepPayload";
import IdPayload from "../Payloads/Defaults/IdPayload";
import UserUpdatePayload from "../Payloads/Users/UserUpdatePayload";
import {REPOSITORIES} from "../repositories";
import IUserRepository from "../Repositories/Contracts/IUserRepository";
import ICriteria from "../Lib/Contracts/ICriteria";
import IEncryptionStrategy from "../Lib/Encryption/IEncryptionStrategy";
import UserAssignRolePayload from "../Payloads/Users/UserAssignRolePayload";
import IUserService from "./Contracts/IUserService";
import EncryptionFactory from "../Lib/Factories/EncryptionFactory";
import ChangeUserPasswordPayload from "../Payloads/Users/ChangeUserPasswordPayload";
import ChangeMyPasswordPayload from "../Payloads/Users/ChangeMyPasswordPayload";
import ErrorException from "../Lib/ErrorException";
import StatusCode from "../Lib/StatusCode";
import CheckUserRolePayload from "../Payloads/Auxiliars/CheckUserRolePayload";
import IRoleRepository from "../Repositories/Contracts/IRoleRepository";
import RoleRepoFactory from "../Repositories/Factories/RoleRepoFactory";
import Role from "../Entities/Role";
import Roles from "../Api/Libs/Roles";

@injectable()
class UserService implements IUserService
{
    private repository: IUserRepository;
    private encryption: IEncryptionStrategy;

    constructor(@inject(REPOSITORIES.IUserRepository) repository: IUserRepository)
    {
        this.repository = repository;
        this.encryption = EncryptionFactory.create();
    }

    public async save (payload: UserRepPayload): Promise<User>
    {
        const user = new User();
        user.firstName = payload.firstName();
        user.lastName = payload.lastName();
        user.email = payload.email();
        user.password = await this.encryption.encrypt(payload.password());
        user.enable = payload.enable();
        user.confirmationToken = payload.confirmationToken();
        user.passwordRequestedAt = payload.passwordRequestedAt();
        user.permissions = payload.permissions();
        user.roles = payload.roles();
        user.isSuperAdmin = payload.isSuperAdmin();

        await this.repository.save(user);

        return user;
    }

    public async update (payload: UserUpdatePayload): Promise<User>
    {
        const id = payload.id();
        const user = await this.repository.findOne(id);
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

    public async assignRole (payload: UserAssignRolePayload): Promise<any>
    {
        const id = payload.id();
        const user = await this.repository.findOne(id);

        user.roles = await payload.rolesId();

        await this.repository.save(user);

        return user;
    }

    public async list (criteria: ICriteria)
    {
        return await this.repository.list(criteria);
    }

    public async getOne (payload: IdPayload): Promise<User>
    {
        const id = payload.id();
        return await this.repository.findOne(id);
    }

    public async remove (payload: IdPayload): Promise<any>
    {
        const id = payload.id();
        return await this.repository.delete(id);
    }

    public async changeMyPassword(payload: ChangeMyPasswordPayload): Promise<User>
    {
        const id = payload.id();
        const user = await this.repository.findOne(id);
        if(! await this.encryption.compare(payload.currentPassword(), user.password)){
            throw new ErrorException(StatusCode.HTTP_FORBIDDEN, 'Your current password is wrong');
        }

        user.password = await this.encryption.encrypt(payload.newPassword());

        await this.repository.save(user);

        return user;
    }

    public async changeUserPassword (payload: ChangeUserPasswordPayload): Promise<User>
    {
        const id = payload.id();
        const user = await this.repository.findOne(id);

        user.password = await this.encryption.encrypt(payload.newPassword());

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

export default UserService;