import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import UserSavePayload from '../../InterfaceAdapters/Payloads/UserSavePayload';
import UserRepPayload from '../../InterfaceAdapters/Payloads/UserRepPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import User from '../Entities/User';
import IUserRepository from '../../InterfaceAdapters/IUserRepository';
import { REPOSITORIES } from '../../../repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import IAuthService from '../../../Auth/InterfaceAdapters/IAuthService';
import { SERVICES } from '../../../services';
import CheckUserRolePayload from '../../InterfaceAdapters/Payloads/CheckUserRolePayload';
import IRoleDomain from '../../../Role/InterfaceAdapters/IRoleDomain';
import IRoleRepository from '../../../Role/InterfaceAdapters/IRoleRepository';
import ChangeUserPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeUserPasswordPayload';
import UserAssignRolePayload from '../../InterfaceAdapters/Payloads/UserAssignRolePayload';
import UserAssignRoleByPayload from 'User/InterfaceAdapters/Payloads/UserAssignRoleByPayload';
import Password from '../../../App/Domain/ValueObjects/Password';
import { injectable } from 'inversify';
import IUserService from '../../InterfaceAdapters/IUserService';
import UniqueService from '../../../App/Domain/Services/UniqueService';
import MainConfig from '../../../Config/mainConfig';

@injectable()
class UserService implements IUserService
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    @containerFactory(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository;

    @containerFactory(SERVICES.IAuthService)
    private authService: IAuthService;

    private config = MainConfig.getInstance();

    async persist(user: IUserDomain, payload: UserRepPayload): Promise<IUserDomain>
    {
        this.authService.validatePermissions(payload.getPermissions());

        void await UniqueService.validate<IUserDomain>({
            repository: REPOSITORIES.IUserRepository,
            validate: {
                email: payload.getEmail(),
                documentNumber: payload.getDocumentNumber()
            },
            refValue: user.getId()
        });

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
        const user = new User();

        void await UniqueService.validate<IUserDomain>({
            repository: REPOSITORIES.IUserRepository,
            validate: {
                email: payload.getEmail(),
                documentNumber: payload.getDocumentNumber()
            }
        });

        const min = this.config.getConfig().validationSettings.password.minLength;
        const max = this.config.getConfig().validationSettings.password.maxLength;

        void await UniqueService.validate<IUserDomain>({
            repository: REPOSITORIES.IUserRepository,
            validate: {
                email: payload.getEmail(),
                documentNumber: payload.getDocumentNumber()
            }
        });

        const password = new Password(payload.getPassword(), min, max);
        user.password = await password.ready();

        user.confirmationToken = await payload.getConfirmationToken();
        user.passwordRequestedAt = payload.getPasswordRequestedAt();
        user.roles = payload.getRoles();
        user.isSuperAdmin = payload.getIsSuperAdmin();

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

        const password = new Password(payload.getPassword(), min, max);
        user.password = await password.ready();

        return await this.repository.update(user);
    }

    async assignRole(payload: UserAssignRolePayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        const user: IUserDomain = await this.getOne(id);

        user.clearRoles();

        const roles = await this.roleRepository.getInBy({ _id: payload.getRolesId() });

        roles.forEach(role => user.setRole(role));

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

    async checkIfUserHasRole(payload: CheckUserRolePayload): Promise<boolean>
    {
        const count = payload.user.roles.length;

        for (let i = 0; i < count; i++)
        {
            const role: IRoleDomain = await this.roleRepository.getOne(payload.user.roles[i].getId());

            if (role.slug === payload.role_to_check)
            {
                return true;
            }
        }

        return false;
    }
}

export default UserService;
