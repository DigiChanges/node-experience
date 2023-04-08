import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import Role from '../../Domain/Entities/Role';
import IUserDomain from '../../Domain/Entities/IUserDomain';
import User from '../../Domain/Entities/User';
import IUserRepository from '../Repositories/User/IUserRepository';
import IRoleRepository from '../Repositories/Role/IRoleRepository';
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
            permissions: ['rolesSave']
        };

        const roleSuperAdmin: IRoleDomain = new Role(payloadSuperAdmin);
        await this.roleRepository.save(roleSuperAdmin);

        const payloadAdmin = {
            name: 'Admin',
            permissions: Permissions.permissions()
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
            permissions: ['rolesSave']
        };

        const roleOperatorDisabled: IRoleDomain = new Role(payloadOperatorDisabled);
        await this.roleRepository.save(roleOperatorDisabled);

        const payloadUserSuperAdmin = {
            firstName: 'Super',
            lastName: 'Admin',
            email: 'superadmin@node.com',
            birthdate: '04/07/1990',
            genre: 'M',
            phone: '2234456999',
            country: 'Argentina',
            enable: true,
            roles: [roleSuperAdmin]
        };

        const userSuperAdmin: IUserDomain = new User(payloadUserSuperAdmin);
        // userSuperAdmin.password = await (new Password('12345678', minLength, maxLength)).ready();
        userSuperAdmin.verify = true;

        await this.userRepository.save(userSuperAdmin, '12345678');

        const payloadUserAdmin = {
            firstName: 'user',
            lastName: 'node',
            email: 'user@node.com',
            birthdate: '04/07/1991',
            genre: 'M',
            phone: '2234456999',
            country: 'Argentina',
            enable: true,
            roles: [roleAdmin]
        };

        const userAdmin: IUserDomain = new User(payloadUserAdmin);
        // userAdmin.password = await (new Password('12345678', minLength, maxLength)).ready();
        userAdmin.verify = true;

        await this.userRepository.save(userAdmin, '12345678');

        const payloadUserOperator = {
            firstName: 'operator',
            lastName: 'enable',
            email: 'operator@enable.com',
            birthdate: '04/07/1992',
            genre: 'M',
            phone: '2234456999',
            country: 'Argentina',
            enable: true,
            roles: [roleOperator]
        };

        const userOperator: IUserDomain = new User(payloadUserOperator);
        // userOperator.password = await (new Password('123456789', minLength, maxLength)).ready();
        userOperator.verify = true;

        await this.userRepository.save(userOperator, '123456789');

        const payloadUserOperatorDisabled = {
            firstName: 'operator',
            lastName: 'disabled',
            email: 'operator@disabled.com',
            birthdate: '04/07/1994',
            genre: 'F',
            phone: '2234456999',
            country: 'Argentina',
            enable: false,
            roles: [roleOperator]
        };

        const userOperatorDisabled: IUserDomain = new User(payloadUserOperatorDisabled);
        // userOperatorDisabled.password = await (new Password('1234567901', minLength, maxLength)).ready();
        userOperator.verify = false;

        await this.userRepository.save(userOperatorDisabled, '1234567901');
        const payloadUserOperatorRoleDisabled = {
            firstName: 'operator',
            lastName: 'roleDisabled',
            email: 'operator@roleDisabled.com',
            birthdate: '04/07/1995',
            genre: 'F',
            phone: '2234456999',
            country: 'Argentina',
            enable: true,
            roles: [roleOperatorDisabled]
        };

        const userOperatorRoleDisabled: IUserDomain = new User(payloadUserOperatorRoleDisabled);
        userOperatorRoleDisabled.password = await (new Password('1234567901', minLength, maxLength)).ready();
        userOperatorRoleDisabled.verify = true;

        await this.userRepository.save(userOperatorRoleDisabled, '1234567901');
    }
}

export default UserSeed;
