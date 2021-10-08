import { IEncryption } from '@digichanges/shared-experience';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import UserSavePayload from '../../InterfaceAdapters/Payloads/UserSavePayload';
import UserRepPayload from '../../InterfaceAdapters/Payloads/UserRepPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import User from '../Entities/User';
import IUserRepository from '../../InterfaceAdapters/IUserRepository';
import { REPOSITORIES } from '../../../Config/repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import IAuthService from '../../../Auth/InterfaceAdapters/IAuthService';
import { SERVICES } from '../../../services';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';
import CheckUserRolePayload from '../../InterfaceAdapters/Payloads/CheckUserRolePayload';
import IRoleDomain from '../../../Role/InterfaceAdapters/IRoleDomain';
import IRoleRepository from '../../../Role/InterfaceAdapters/IRoleRepository';
import ChangeUserPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeUserPasswordPayload';
import UserAssignRolePayload from '../../InterfaceAdapters/Payloads/UserAssignRolePayload';
import UserAssignRoleByPayload from 'User/InterfaceAdapters/Payloads/UserAssignRoleByPayload';


class UserService
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    @containerFactory(REPOSITORIES.IRoleRepository)
    private role_repository: IRoleRepository;

    @containerFactory(SERVICES.IAuthService)
    private auth_service: IAuthService;
    private encryption: IEncryption;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    async persist(user: IUserDomain, payload: UserRepPayload): Promise<IUserDomain>
    {
        this.auth_service.validate_permissions(payload.get_permissions());
        user.first_name = payload.get_first_name();
        user.last_name = payload.get_last_name();
        user.enable = payload.get_enable();
        user.email = payload.get_email();
        user.birthday = payload.get_birthday();
        user.document_type = payload.get_document_type();
        user.document_number = payload.get_document_number();
        user.gender = payload.get_gender();
        user.phone = payload.get_phone();
        user.country = payload.get_country();
        user.address = payload.get_address();
        user.permissions = payload.get_permissions();

        return await this.repository.save(user);
    }

    async create(payload: UserSavePayload): Promise<IUserDomain>
    {
        const user = new User();
        user.password = await this.encryption.encrypt(payload.get_password());
        user.confirmation_token = payload.get_confirmation_token();
        user.password_requested_at = payload.get_password_requested_at();
        user.roles = payload.get_roles();
        user.is_super_admin = payload.get_is_super_admin();
        return await this.persist(user, payload);
    }

    async get_one(id: string): Promise<IUserDomain>
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

    async persist_password(user: IUserDomain, payload: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        user.password = await this.encryption.encrypt(payload.get_password());
        return await this.repository.update(user);
    }

    async assign_role(payload: UserAssignRolePayload): Promise<IUserDomain>
    {
        const id = payload.get_id();
        const user: IUserDomain = await this.get_one(id);

        user.clear_roles();

        const roles = await this.role_repository.getInBy({ _id: payload.getRolesId() });

        roles.forEach(role => user.set_role(role));

        return await this.repository.save(user);
    }

    async assign_role_by_slug(payload: UserAssignRoleByPayload): Promise<IUserDomain>
    {
        const email = payload.get_email();
        const slug = payload.get_slug_role();

        const user: IUserDomain = await this.repository.get_one_by_email(email);
        const role: IRoleDomain = await this.role_repository.get_by_slug(slug);

        user.set_role(role);

        return await this.repository.save(user);
    }

    public async check_if_user_has_role(payload: CheckUserRolePayload): Promise<boolean>
    {
        const count = payload.user.roles.length;

        for (let i = 0; i < count; i++)
        {
            const role: IRoleDomain = await this.role_repository.getOne(payload.user.roles[i].get_id());

            if (role.slug === payload.role_to_check)
            {
                return true;
            }
        }

        return false;
    }
}

export default UserService;
