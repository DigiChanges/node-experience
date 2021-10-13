import { IEncryption } from '@digichanges/shared-experience';

import IRoleDomain from '../../../Role/InterfaceAdapters/IRoleDomain';
import Role from '../../../Role/Domain/Entities/Role';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import User from '../../Domain/Entities/User';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';
import IUserRepository from '../../InterfaceAdapters/IUserRepository';
import IRoleRepository from '../../../Role/InterfaceAdapters/IRoleRepository';
import { REPOSITORIES } from '../../../Config/repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import ISeed from '../../../Shared/InterfaceAdapters/ISeed';

class UserSeed implements ISeed
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private user_repository: IUserRepository;

    @containerFactory(REPOSITORIES.IRoleRepository)
    private role_repository: IRoleRepository;

    private encryption: IEncryption;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    public async init(): Promise<void>
    {
        const role_super_admin: IRoleDomain = new Role();
        role_super_admin.name = 'SuperAdmin';
        role_super_admin.slug = 'superadmin';
        role_super_admin.permissions = [];
        role_super_admin.enable = true;

        await this.role_repository.save(role_super_admin);

        const role_admin: IRoleDomain = new Role();
        role_admin.name = 'Admin';
        role_admin.slug = 'admin';
        role_admin.permissions = [];
        role_admin.enable = true;

        await this.role_repository.save(role_admin);

        const role_operator: IRoleDomain = new Role();
        role_operator.name = 'Operator';
        role_operator.slug = 'operator';
        role_operator.permissions = [];
        role_operator.enable = true;

        await this.role_repository.save(role_operator);

        const role_operator_disabled: IRoleDomain = new Role();
        role_operator_disabled.name = 'OperatorDisabled';
        role_operator_disabled.slug = 'operatordisabled';
        role_operator_disabled.permissions = [];
        role_operator_disabled.enable = false;

        await this.role_repository.save(role_operator_disabled);

        const user_super_admin: IUserDomain = new User();
        user_super_admin.first_name = 'Super';
        user_super_admin.last_name = 'Admin';
        user_super_admin.email = 'superadmin@node.com';
        user_super_admin.birthday = '04/07/1990';
        user_super_admin.document_type = 'dni';
        user_super_admin.document_number = '35319158';
        user_super_admin.gender = 'male';
        user_super_admin.phone = '2234456999';
        user_super_admin.country = 'Argentina';
        user_super_admin.address = 'New America 123';
        user_super_admin.password = await this.encryption.encrypt('12345678');
        user_super_admin.enable = true;
        user_super_admin.confirmation_token = null;
        user_super_admin.password_requested_at = null;
        user_super_admin.permissions = [];
        user_super_admin.roles = [role_super_admin];
        user_super_admin.is_super_admin = true;

        await this.user_repository.save(user_super_admin);

        const user_admin: IUserDomain = new User();
        user_admin.first_name = 'user';
        user_admin.last_name = 'node';
        user_admin.email = 'user@node.com';
        user_admin.birthday = '04/07/1991';
        user_admin.document_type = 'dni';
        user_admin.document_number = '35319156';
        user_admin.gender = 'male';
        user_admin.phone = '2234456999';
        user_admin.country = 'Argentina';
        user_admin.address = 'New America 123';
        user_admin.password = await this.encryption.encrypt('12345678');
        user_admin.enable = true;
        user_admin.confirmation_token = null;
        user_admin.password_requested_at = null;
        user_admin.permissions = [];
        user_admin.roles = [role_admin];
        user_admin.is_super_admin = false;

        await this.user_repository.save(user_admin);

        const user_operator: IUserDomain = new User();
        user_operator.first_name = 'operator';
        user_operator.last_name = 'enable';
        user_operator.email = 'operator@enable.com';
        user_operator.birthday = '04/07/1992';
        user_operator.document_type = 'dni';
        user_operator.document_number = '35319157';
        user_operator.gender = 'male';
        user_operator.phone = '2234456999';
        user_operator.country = 'Argentina';
        user_operator.address = 'New America 123';
        user_operator.password = await this.encryption.encrypt('123456789');
        user_operator.enable = true;
        user_operator.confirmation_token = null;
        user_operator.password_requested_at = null;
        user_operator.permissions = [];
        user_operator.roles = [role_operator];
        user_operator.is_super_admin = false;

        await this.user_repository.save(user_operator);

        const user_operator_disabled: IUserDomain = new User();
        user_operator_disabled.first_name = 'operator';
        user_operator_disabled.last_name = 'disabled';
        user_operator_disabled.email = 'operator@disabled.com';
        user_operator_disabled.birthday = '04/07/1994';
        user_operator_disabled.document_type = 'dni';
        user_operator_disabled.document_number = '35319151';
        user_operator_disabled.gender = 'female';
        user_operator_disabled.phone = '2234456999';
        user_operator_disabled.country = 'Argentina';
        user_operator_disabled.address = 'New America 123';
        user_operator_disabled.password = await this.encryption.encrypt('1234567901');
        user_operator_disabled.enable = false;
        user_operator_disabled.confirmation_token = null;
        user_operator_disabled.password_requested_at = null;
        user_operator_disabled.permissions = [];
        user_operator_disabled.roles = [role_operator];
        user_operator_disabled.is_super_admin = false;

        await this.user_repository.save(user_operator_disabled);

        const user_operator_role_disabled: IUserDomain = new User();
        user_operator_role_disabled.first_name = 'operator';
        user_operator_role_disabled.last_name = 'roleDisabled';
        user_operator_role_disabled.email = 'operator@roleDisabled.com';
        user_operator_role_disabled.birthday = '04/07/1995';
        user_operator_role_disabled.document_type = 'dni';
        user_operator_role_disabled.document_number = '35319150';
        user_operator_role_disabled.gender = 'female';
        user_operator_role_disabled.phone = '2234456999';
        user_operator_role_disabled.country = 'Argentina';
        user_operator_role_disabled.address = 'New America 123';
        user_operator_role_disabled.password = await this.encryption.encrypt('123456790');
        user_operator_role_disabled.enable = true;
        user_operator_role_disabled.confirmation_token = null;
        user_operator_role_disabled.password_requested_at = null;
        user_operator_role_disabled.permissions = [];
        user_operator_role_disabled.roles = [role_operator_disabled];
        user_operator_role_disabled.is_super_admin = false;

        await this.user_repository.save(user_operator_role_disabled);
    }
}

export default UserSeed;
