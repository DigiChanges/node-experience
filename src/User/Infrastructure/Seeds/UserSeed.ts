import faker from 'faker';
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
import Password from '../../../App/Domain/ValueObjects/Password';

class UserSeed implements ISeed
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private userRepository: IUserRepository;

    @containerFactory(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository;

    private encryption: IEncryption;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    public async init(): Promise<void>
    {
        const roleSuperAdmin: IRoleDomain = new Role();
        roleSuperAdmin.name = 'SuperAdmin';
        roleSuperAdmin.slug = 'superadmin';
        roleSuperAdmin.permissions = [];
        roleSuperAdmin.enable = true;

        await this.roleRepository.save(roleSuperAdmin);

        const roleAdmin: IRoleDomain = new Role();
        roleAdmin.name = 'Admin';
        roleAdmin.slug = 'admin';
        roleAdmin.permissions = [];
        roleAdmin.enable = true;

        await this.roleRepository.save(roleAdmin);

        const roleOperator: IRoleDomain = new Role();
        roleOperator.name = 'Operator';
        roleOperator.slug = 'operator';
        roleOperator.permissions = [];
        roleOperator.enable = true;

        await this.roleRepository.save(roleOperator);

        const roleOperatorDisabled: IRoleDomain = new Role();
        roleOperatorDisabled.name = 'OperatorDisabled';
        roleOperatorDisabled.slug = 'operatordisabled';
        roleOperatorDisabled.permissions = [];
        roleOperatorDisabled.enable = false;

        await this.roleRepository.save(roleOperatorDisabled);

        const userSuperAdmin: IUserDomain = new User();
        userSuperAdmin.firstName = 'Super';
        userSuperAdmin.lastName = 'Admin';
        userSuperAdmin.email = 'superadmin@node.com';
        userSuperAdmin.birthday = '04/07/1990';
        userSuperAdmin.documentType = 'dni';
        userSuperAdmin.documentNumber = '35319158';
        userSuperAdmin.gender = 'male';
        userSuperAdmin.phone = '2234456999';
        userSuperAdmin.country = 'Argentina';
        userSuperAdmin.address = 'New America 123';

        const password = new Password('12345678');
        await password.ready();
        userSuperAdmin.password = password;

        userSuperAdmin.enable = true;
        userSuperAdmin.confirmationToken = null;
        userSuperAdmin.passwordRequestedAt = null;
        userSuperAdmin.permissions = [];
        userSuperAdmin.roles = [roleSuperAdmin];
        userSuperAdmin.isSuperAdmin = true;

        await this.userRepository.save(userSuperAdmin);

        const userAdmin: IUserDomain = new User();
        userAdmin.firstName = 'user';
        userAdmin.lastName = 'node';
        userAdmin.email = 'user@node.com';
        userAdmin.birthday = '04/07/1991';
        userAdmin.documentType = 'dni';
        userAdmin.documentNumber = '35319156';
        userAdmin.gender = 'male';
        userAdmin.phone = '2234456999';
        userAdmin.country = 'Argentina';
        userAdmin.address = 'New America 123';

        const userAdminPassword = new Password('12345678');
        await userAdminPassword.ready();
        userAdmin.password = userAdminPassword;

        userAdmin.enable = true;
        userAdmin.confirmationToken = null;
        userAdmin.passwordRequestedAt = null;
        userAdmin.permissions = [];
        userAdmin.roles = [roleAdmin];
        userAdmin.isSuperAdmin = false;

        await this.userRepository.save(userAdmin);

        const userOperator: IUserDomain = new User();
        userOperator.firstName = 'operator';
        userOperator.lastName = 'enable';
        userOperator.email = 'operator@enable.com';
        userOperator.birthday = '04/07/1992';
        userOperator.documentType = 'dni';
        userOperator.documentNumber = '35319157';
        userOperator.gender = 'male';
        userOperator.phone = '2234456999';
        userOperator.country = 'Argentina';
        userOperator.address = 'New America 123';

        const userOperatorPassword = new Password('123456789');
        await userOperatorPassword.ready();
        userOperator.password = userOperatorPassword;

        userOperator.enable = true;
        userOperator.confirmationToken = null;
        userOperator.passwordRequestedAt = null;
        userOperator.permissions = [];
        userOperator.roles = [roleOperator];
        userOperator.isSuperAdmin = false;

        await this.userRepository.save(userOperator);

        const userOperatorDisabled: IUserDomain = new User();
        userOperatorDisabled.firstName = 'operator';
        userOperatorDisabled.lastName = 'disabled';
        userOperatorDisabled.email = 'operator@disabled.com';
        userOperatorDisabled.birthday = '04/07/1994';
        userOperatorDisabled.documentType = 'dni';
        userOperatorDisabled.documentNumber = '35319151';
        userOperatorDisabled.gender = 'female';
        userOperatorDisabled.phone = '2234456999';
        userOperatorDisabled.country = 'Argentina';
        userOperatorDisabled.address = 'New America 123';

        const userOperatorDisabledPassword = new Password('1234567901');
        await userOperatorDisabledPassword.ready();
        userOperatorDisabled.password = userOperatorDisabledPassword;

        userOperatorDisabled.enable = false;
        userOperatorDisabled.confirmationToken = null;
        userOperatorDisabled.passwordRequestedAt = null;
        userOperatorDisabled.permissions = [];
        userOperatorDisabled.roles = [roleOperator];
        userOperatorDisabled.isSuperAdmin = false;

        await this.userRepository.save(userOperatorDisabled);

        const userOperatorRoleDisabled: IUserDomain = new User();
        userOperatorRoleDisabled.firstName = 'operator';
        userOperatorRoleDisabled.lastName = 'roleDisabled';
        userOperatorRoleDisabled.email = 'operator@roleDisabled.com';
        userOperatorRoleDisabled.birthday = '04/07/1995';
        userOperatorRoleDisabled.documentType = 'dni';
        userOperatorRoleDisabled.documentNumber = '35319150';
        userOperatorRoleDisabled.gender = 'female';
        userOperatorRoleDisabled.phone = '2234456999';
        userOperatorRoleDisabled.country = 'Argentina';
        userOperatorRoleDisabled.address = 'New America 123';

        const userOperatorRoleDisabledPassword = new Password('1234567901');
        await userOperatorRoleDisabledPassword.ready();
        userOperatorRoleDisabled.password = userOperatorRoleDisabledPassword;

        userOperatorRoleDisabled.enable = true;
        userOperatorRoleDisabled.confirmationToken = null;
        userOperatorRoleDisabled.passwordRequestedAt = null;
        userOperatorRoleDisabled.permissions = [];
        userOperatorRoleDisabled.roles = [roleOperatorDisabled];
        userOperatorRoleDisabled.isSuperAdmin = false;

        await this.userRepository.save(userOperatorRoleDisabled);
    }
}

export default UserSeed;
