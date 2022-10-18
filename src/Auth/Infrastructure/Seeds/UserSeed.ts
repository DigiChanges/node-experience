import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import Role from '../../Domain/Entities/Role';
import IUserDomain from '../../Domain/Entities/IUserDomain';
import User from '../../Domain/Entities/User';
import IUserRepository from '../Repositories/IUserRepository';
import IRoleRepository from '../../../Auth/Infrastructure/Repositories/IRoleRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import Password from '../../../Shared/Domain/ValueObjects/Password';
import Permissions from '../../../Config/Permissions';
import MainConfig from '../../../Config/MainConfig';
import BaseSeed from '../../../Shared/Infrastructure/Seeds/BaseSeed';

class UserSeed extends BaseSeed
{
    private userRepository: IUserRepository;
    private roleRepository: IRoleRepository;

    constructor()
    {
        super();
        this.userRepository = this.container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
        this.roleRepository = this.container.resolve<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    public async init(): Promise<void>
    {
        const config = MainConfig.getInstance();

        const { minLength, maxLength } = config.getConfig().validationSettings.password;

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
            birthday: '04/07/1990',
            documentType: 'dni',
            documentNumber: '35319158',
            gender: 'male',
            phone: '2234456999',
            country: 'Argentina',
            address: 'New America 123',
            enable: true,
            permissions: ['itemsSave'],
            roles: [roleSuperAdmin],
            isSuperAdmin: true
        };

        const userSuperAdmin: IUserDomain = new User(payloadUserSuperAdmin);
        userSuperAdmin.password = await (new Password('12345678', minLength, maxLength)).ready();
        userSuperAdmin.verify = true;

        await this.userRepository.save(userSuperAdmin);

        const payloadUserAdmin = {
            firstName: 'user',
            lastName: 'node',
            email: 'user@node.com',
            birthday: '04/07/1991',
            documentType: 'dni',
            documentNumber: '35319156',
            gender: 'male',
            phone: '2234456999',
            country: 'Argentina',
            address: 'New America 123',
            enable: true,
            permissions: ['itemsSave'],
            roles: [roleAdmin],
            isSuperAdmin: false
        };

        const userAdmin: IUserDomain = new User(payloadUserAdmin);
        userAdmin.password = await (new Password('12345678', minLength, maxLength)).ready();
        userAdmin.verify = true;

        await this.userRepository.save(userAdmin);

        const payloadUserOperator = {
            firstName: 'operator',
            lastName: 'enable',
            email: 'operator@enable.com',
            birthday: '04/07/1992',
            documentType: 'dni',
            documentNumber: '35319157',
            gender: 'male',
            phone: '2234456999',
            country: 'Argentina',
            address: 'New America 123',
            permissions: ['itemsSave'],
            enable: true,
            roles: [roleOperator],
            isSuperAdmin: false
        };

        const userOperator: IUserDomain = new User(payloadUserOperator);
        userOperator.password = await (new Password('123456789', minLength, maxLength)).ready();
        userOperator.verify = true;

        await this.userRepository.save(userOperator);

        const payloadUserOperatorDisabled = {
            firstName: 'operator',
            lastName: 'disabled',
            email: 'operator@disabled.com',
            birthday: '04/07/1994',
            documentType: 'dni',
            documentNumber: '35319151',
            gender: 'female',
            phone: '2234456999',
            country: 'Argentina',
            address: 'New America 123',
            enable: false,
            permissions: ['itemsSave'],
            roles: [roleOperator],
            isSuperAdmin: false
        };

        const userOperatorDisabled: IUserDomain = new User(payloadUserOperatorDisabled);
        userOperatorDisabled.password = await (new Password('1234567901', minLength, maxLength)).ready();
        userOperator.verify = false;

        await this.userRepository.save(userOperatorDisabled);
        const payloadUserOperatorRoleDisabled = {
            firstName: 'operator',
            lastName: 'roleDisabled',
            email: 'operator@roleDisabled.com',
            birthday: '04/07/1995',
            documentType: 'dni',
            documentNumber: '35319150',
            gender: 'female',
            phone: '2234456999',
            country: 'Argentina',
            address: 'New America 123',
            enable: true,
            permissions: ['itemsSave'],
            roles: [roleOperatorDisabled],
            isSuperAdmin: false
        };

        const userOperatorRoleDisabled: IUserDomain = new User(payloadUserOperatorRoleDisabled);
        userOperatorRoleDisabled.password = await (new Password('1234567901', minLength, maxLength)).ready();
        userOperatorRoleDisabled.verify = true;

        await this.userRepository.save(userOperatorRoleDisabled);
    }
}

export default UserSeed;
