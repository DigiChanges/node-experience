import IRoleDomain from '../../../Role/Domain/Entities/IRoleDomain';
import Role from '../../../Role/Domain/Entities/Role';
import IUserDomain from '../../Domain/Entities/IUserDomain';
import User from '../../Domain/Entities/User';
import IUserRepository from '../Repositories/IUserRepository';
import IRoleRepository from '../../../Role/Infrastructure/Repositories/IRoleRepository';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import ISeed from '../../../Shared/InterfaceAdapters/ISeed';
import Password from '../../../App/Domain/ValueObjects/Password';
import Permissions from '../../../Config/Permissions';
import MainConfig from '../../../Config/mainConfig';

class UserSeed implements ISeed
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private userRepository: IUserRepository;

    @containerFactory(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository;

    public async init(): Promise<void>
    {
        const config = MainConfig.getInstance();

        const min = config.getConfig().validationSettings.password.minLength;
        const max = config.getConfig().validationSettings.password.maxLength;

        const payloadSuperAdmin = {
            name: 'SuperAdmin',
            slug: 'superAdmin',
            permissions: ['rolesSave'],
            enable: true
        };

        const roleSuperAdmin: IRoleDomain = new Role(payloadSuperAdmin);
        await this.roleRepository.save(roleSuperAdmin);

        const payloadAdmin = {
            name: 'Admin',
            slug: 'admin',
            permissions: Permissions.permissions(),
            enable: true
        };

        const roleAdmin: IRoleDomain = new Role(payloadAdmin);
        await this.roleRepository.save(roleAdmin);

        const payloadOperator = {
            name: 'Operator',
            slug: 'operator',
            permissions: ['rolesSave'],
            enable: true
        };

        const roleOperator: IRoleDomain = new Role(payloadOperator);
        await this.roleRepository.save(roleOperator);

        const payloadOperatorDisabled = {
            name: 'OperatorDisabled',
            slug: 'operatordisabled',
            permissions: ['rolesSave'],
            enable: false
        };

        const roleOperatorDisabled: IRoleDomain = new Role(payloadOperatorDisabled);
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

        const password = new Password('12345678', min, max);
        await password.ready();
        userSuperAdmin.password = password;

        userSuperAdmin.enable = true;
        userSuperAdmin.verify = true;
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

        const userAdminPassword = new Password('12345678', min, max);
        userAdmin.password = await userAdminPassword.ready();

        userAdmin.verify = true;
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

        const userOperatorPassword = new Password('123456789', min, max);
        userOperator.password = await userOperatorPassword.ready();

        userOperator.verify = true;
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

        const userOperatorDisabledPassword = new Password('1234567901', min, max);
        userOperatorDisabled.password = await userOperatorDisabledPassword.ready();

        userOperatorDisabled.verify = false;
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

        const userOperatorRoleDisabledPassword = new Password('1234567901', min, max);
        userOperatorRoleDisabled.password = await userOperatorRoleDisabledPassword.ready();

        userOperatorRoleDisabled.verify = true;
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
