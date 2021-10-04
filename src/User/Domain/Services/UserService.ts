import { IEncryption } from '@digichanges/shared-experience';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import UserSavePayload from '../../InterfaceAdapters/Payloads/UserSavePayload';
import UserRepPayload from '../../InterfaceAdapters/Payloads/UserRepPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import User from '../Entities/User';
import IUserRepository from '../../InterfaceAdapters/IUserRepository';
import { REPOSITORIES } from '../../../Config/repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import UserUpdatePayload from '../../InterfaceAdapters/Payloads/UserUpdatePayload';
import IAuthService from '../../../Auth/InterfaceAdapters/IAuthService';
import { SERVICES } from '../../../services';
import ValidatorRequest from '../../../App/Presentation/Shared/Express/ValidatorRequest';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';
import CheckUserRolePayload from '../../InterfaceAdapters/Payloads/CheckUserRolePayload';
import Roles from '../../../Config/Roles';
import CantDisabledException from '../../../Auth/Domain/Exceptions/CantDisabledException';
import IRoleDomain from '../../../Role/InterfaceAdapters/IRoleDomain';
import IRoleRepository from '../../../Role/InterfaceAdapters/IRoleRepository';
import ChangeMyPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeMyPasswordPayload';
import ChangeUserPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeUserPasswordPayload';
import PasswordWrongException from '../../../Auth/Domain/Exceptions/PasswordWrongException';
import UserAssignRolePayload from '../../InterfaceAdapters/Payloads/UserAssignRolePayload';
import UserAssignRoleByPayload from 'User/InterfaceAdapters/Payloads/UserAssignRoleByPayload';


class UserService
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    @containerFactory(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository;

    @containerFactory(SERVICES.IAuthService)
    private authService: IAuthService;
    private encryption: IEncryption;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    async persist(user: IUserDomain, payload: UserRepPayload): Promise<IUserDomain>
    {
        this.authService.validatePermissions(payload.getPermissions());
        user.firstName = payload.getFirstName();
        user.lastName = payload.getLastName();
        user.enable = payload.getEnable();
        user.email = payload.getEmail();
        user.birthday = payload.getBirthday();
        user.documentType = payload.getDocumentType();
        user.documentNumber = payload.getDocumentNumber();
        user.gender = payload.getGender();
        user.phone = payload.getPhone();
        user.country = payload.getCountry();
        user.address = payload.getAddress();
        user.permissions = payload.getPermissions();

        return await this.repository.save(user);
    }

    async create(payload: UserSavePayload): Promise<IUserDomain>
    {
        await ValidatorRequest.handle(payload);
        const user = new User();
        user.password = await this.encryption.encrypt(payload.getPassword());
        user.confirmationToken = payload.getConfirmationToken();
        user.passwordRequestedAt = payload.getPasswordRequestedAt();
        user.roles = payload.getRoles();
        user.isSuperAdmin = payload.getIsSuperAdmin();
        return await this.persist(user, payload);
    }

    async update(payload: UserUpdatePayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        const user: IUserDomain = await this.getOne(id);
        let enable = payload.getEnable();

        if (payload.getTokenUserId() === user.getId())
        {
            enable = true;
        }

        if (typeof user.roles !== 'undefined' && enable !== null) // TODO: Refactoring
        {
            const checkRole: CheckUserRolePayload = {
                roleToCheck: Roles.SUPER_ADMIN.toLocaleLowerCase(),
                user
            };

            const verifyRole = await this.checkIfUserHasRole(checkRole);

            if (verifyRole && !enable)
            {
                throw new CantDisabledException();
            }
        }

        return await this.persist(user, payload);
    }

    async getOne(id: string): Promise<IUserDomain>
    {
        return await this.repository.getOne(id);
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
        user.password = await this.encryption.encrypt(payload.getPassword());
        return await this.repository.update(user);
    }

    async changeUserPassword(payload: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        const user: IUserDomain = await this.repository.getOne(id);

        return await this.persistPassword(user, payload);
    }

    async changeMyPassword(payload: ChangeMyPasswordPayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        const user: IUserDomain = await this.repository.getOne(id);

        if (! await this.encryption.compare(payload.getCurrentPassword(), user.password))
        {
            throw new PasswordWrongException();
        }

        return await this.persistPassword(user, payload);
    }

    async assignRole(payload: UserAssignRolePayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        const user: IUserDomain = await this.repository.getOne(id);

        user.clearRoles();

        for await (const roleId of payload.getRolesId())
        {
            const role = await this.roleRepository.getOne(roleId);
            user.setRole(role);
        }

        return await this.repository.save(user);
    }

    async assignRoleBySlug(payload: UserAssignRoleByPayload): Promise<IUserDomain>
    {
        const email = payload.getEmail();
        const slug = payload.getSlugRole();

        const user: IUserDomain = await this.repository.getOneByEmail(email);
        const role: IRoleDomain = await this.roleRepository.getBySlug(slug);

        user.setRole(role);

        return await this.repository.save(user);
    }

    public async checkIfUserHasRole(payload: CheckUserRolePayload): Promise<boolean>
    {
        const count = payload.user.roles.length;

        for (let i = 0; i < count; i++)
        {
            const role: IRoleDomain = await this.roleRepository.getOne(payload.user.roles[i].getId());

            if (role.slug === payload.roleToCheck)
            {
                return true;
            }
        }

        return false;
    }
}

export default UserService;
