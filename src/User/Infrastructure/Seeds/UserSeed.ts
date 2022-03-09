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

        const payloadUserSuperAdmin = {
            firstName: 'Super',
            lastName: 'Admin',
            email: 'superadmin@node.com',
            password: await (new Password('12345678', min, max)).ready(),
            birthday: '04/07/1990',
            documentType: 'dni',
            documentNumber: '35319158',
            gender: 'male',
            phone: '2234456999',
            country: 'Argentina',
            address: 'New America 123',
            enable: true,
            verify: true,
            permissions: ['itemsSave'],
            roles: [roleSuperAdmin],
            isSuperAdmin: true
        };

        const userSuperAdmin: IUserDomain = new User(payloadUserSuperAdmin);

        await this.userRepository.save(userSuperAdmin);

        const payloadUserAdmin = {
            firstName: 'user',
            lastName: 'node',
            email: 'user@node.com',
            birthday: '04/07/1991',
            password: await (new Password('12345678', min, max)).ready(),
            documentType: 'dni',
            documentNumber: '35319156',
            gender: 'male',
            phone: '2234456999',
            country: 'Argentina',
            address: 'New America 123',
            verify: true,
            enable: true,
            permissions: ['itemsSave'],
            roles: [roleAdmin],
            isSuperAdmin: false
        };

        const userAdmin: IUserDomain = new User(payloadUserAdmin);

        await this.userRepository.save(userAdmin);

        const payloadUserOperator = {
            firstName: 'operator',
            lastName: 'enable',
            email: 'operator@enable.com',
            password: await (new Password('123456789', min, max)).ready(),
            birthday: '04/07/1992',
            documentType: 'dni',
            documentNumber: '35319157',
            gender: 'male',
            phone: '2234456999',
            country: 'Argentina',
            address: 'New America 123',
            permissions: ['itemsSave'],
            verify: true,
            enable: true,
            roles: [roleOperator],
            isSuperAdmin: false
        };

        const userOperator: IUserDomain = new User(payloadUserOperator);

        await this.userRepository.save(userOperator);

        const payloadUserOperatorDisabled = {
            firstName: 'operator',
            lastName: 'disabled',
            email: 'operator@disabled.com',
            password: await (new Password('1234567901', min, max)).ready(),
            birthday: '04/07/1994',
            documentType: 'dni',
            documentNumber: '35319151',
            gender: 'female',
            phone: '2234456999',
            country: 'Argentina',
            address: 'New America 123',
            verify: false,
            enable: false,
            permissions: ['itemsSave'],
            roles: [roleOperator],
            isSuperAdmin: false
        };

        const userOperatorDisabled: IUserDomain = new User(payloadUserOperatorDisabled);

        await this.userRepository.save(userOperatorDisabled);
        const payloadUserOperatorRoleDisabled = {
            firstName: 'operator',
            lastName: 'roleDisabled',
            email: 'operator@roleDisabled.com',
            password: await (new Password('1234567901', min, max)).ready(),
            birthday: '04/07/1995',
            documentType: 'dni',
            documentNumber: '35319150',
            gender: 'female',
            phone: '2234456999',
            country: 'Argentina',
            address: 'New America 123',
            verify: true,
            enable: true,
            permissions: ['itemsSave'],
            roles: [roleOperatorDisabled],
            isSuperAdmin: false
        };
        const userOperatorRoleDisabled: IUserDomain = new User(payloadUserOperatorRoleDisabled);

        await this.userRepository.save(userOperatorRoleDisabled);
    }
}

export default UserSeed;
