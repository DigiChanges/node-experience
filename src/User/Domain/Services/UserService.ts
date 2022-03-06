import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import UserSavePayload from '../Payloads/UserSavePayload';
import UserRepPayload from '../Payloads/UserRepPayload';
import IUserDomain from '../Entities/IUserDomain';
import User from '../Entities/User';
import IUserRepository from '../../Infrastructure/Repositories/IUserRepository';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import CheckUserRolePayload from '../Payloads/CheckUserRolePayload';
import IRoleDomain from '../../../Role/Domain/Entities/IRoleDomain';
import IRoleRepository from '../../../Role/Infrastructure/Repositories/IRoleRepository';
import ChangeUserPasswordPayload from '../Payloads/ChangeUserPasswordPayload';
import UserAssignRolePayload from '../Payloads/UserAssignRolePayload';
import UserAssignRoleBySlug from 'User/Domain/Payloads/UserAssignRoleBySlug';
import Password from '../../../App/Domain/ValueObjects/Password';
import UniqueService from '../../../App/Domain/Services/UniqueService';
import MainConfig from '../../../Config/mainConfig';
import UserActivePayload from '../Payloads/UserActivePayload';
import AuthHelper from '../../../Shared/Helpers/AuthHelper';

class UserService
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    @containerFactory(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository;

    private config = MainConfig.getInstance();

    async persist(user: IUserDomain, payload: UserRepPayload): Promise<IUserDomain>
    {
        AuthHelper.validatePermissions(payload.permissions);

        void await UniqueService.validate<IUserDomain>({
            repository: REPOSITORIES.IUserRepository,
            validate: {
                email: payload.email,
                documentNumber: payload.documentNumber
            },
            refValue: user.getId()
        });

        user.firstName = payload.firstName;
        user.lastName = payload.lastName;
        user.enable = payload.enable;
        user.email = payload.email;
        user.birthday = payload.birthday;
        user.documentType = payload.documentType;
        user.documentNumber = payload.documentNumber;
        user.gender = payload.gender;
        user.phone = payload.phone;
        user.country = payload.country;
        user.address = payload.address;
        user.permissions = payload.permissions;

        return await this.repository.save(user);
    }

    async create(payload: UserSavePayload): Promise<IUserDomain>
    {
        const user = new User();

        void await UniqueService.validate<IUserDomain>({
            repository: REPOSITORIES.IUserRepository,
            validate: {
                email: payload.email,
                documentNumber: payload.documentNumber
            }
        });

        const min = this.config.getConfig().validationSettings.password.minLength;
        const max = this.config.getConfig().validationSettings.password.maxLength;

        void await UniqueService.validate<IUserDomain>({
            repository: REPOSITORIES.IUserRepository,
            validate: {
                email: payload.email,
                documentNumber: payload.documentNumber
            }
        });

        user.password = await (new Password(payload.password, min, max)).ready();
        user.confirmationToken = payload.confirmationToken;
        user.passwordRequestedAt = payload.passwordRequestedAt;
        user.roles = payload.roles;
        user.isSuperAdmin = payload.isSuperAdmin;

        return await this.persist(user, payload);
    }

    async getOne(id: string): Promise<IUserDomain>
    {
        return await this.repository.getOneBy({ _id : id }, { populate: 'roles' });
    }

    async remove(id: string): Promise<IUserDomain>
    {
        return await this.repository.delete(id);
    }

    async list(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }

    async persistPassword(user: IUserDomain, payload: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        const min = this.config.getConfig().validationSettings.password.minLength;
        const max = this.config.getConfig().validationSettings.password.maxLength;

        user.password = await (new Password(payload.password, min, max)).ready();

        return await this.repository.update(user);
    }

    async assignRole(payload: UserAssignRolePayload): Promise<IUserDomain>
    {
        const id = payload.id;
        const user: IUserDomain = await this.getOne(id);

        user.clearRoles();

        const roles = await this.roleRepository.getInBy({ _id: payload.rolesId });

        roles.forEach(role => user.setRole(role));

        return await this.repository.save(user);
    }

    async assignRoleBySlug(payload: UserAssignRoleBySlug): Promise<IUserDomain>
    {
        const email = payload.email;
        const slug = payload.slugRole;

        const user: IUserDomain = await this.repository.getOneByEmail(email);
        const role: IRoleDomain = await this.roleRepository.getBySlug(slug);

        user.setRole(role);

        return await this.repository.save(user);
    }

    async checkIfUserHasRole(payload: CheckUserRolePayload): Promise<boolean>
    {
        const roles = payload.user.getRoles();

        roles.forEach((role) =>
        {
            if (role.slug === payload.roleToCheck)
            {
                return true;
            }
        });

        return false;
    }

    async activeUser(payload: UserActivePayload): Promise<void>
    {
        const email = payload.email;
        const user = await this.repository.getOneByEmail(email);

        user.enable = true;
        user.verify = true;

        await this.repository.save(user);
    }
}

export default UserService;
