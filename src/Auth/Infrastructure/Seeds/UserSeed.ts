import dayjs from 'dayjs';

import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import Role from '../../Domain/Entities/Role';
import IUserDomain from '../../Domain/Entities/IUserDomain';
import User from '../../Domain/Entities/User';
import IUserRepository from '../Repositories/User/IUserRepository';
import IRoleRepository from '../Repositories/Role/IRoleRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import Permissions from '../../../Config/Permissions';
import MainConfig from '../../../Config/MainConfig';
import BaseSeed from '../../../Shared/Infrastructure/Seeds/BaseSeed';
import ISeed from '../../../Shared/Infrastructure/Seeds/ISeed';

class UserSeed extends BaseSeed implements ISeed
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

        const payloadAdmin = {
            name: 'Admin',
            permissions: Permissions.permissions()
        };

        const roleAdmin: IRoleDomain = new Role(payloadAdmin);
        await this.roleRepository.save(roleAdmin);

        const payloadOperator = {
            name: 'Operator',
            permissions: []
        };

        const roleOperator: IRoleDomain = new Role(payloadOperator);
        await this.roleRepository.save(roleOperator);

        const payloadUserAdmin = {
            firstName: 'user',
            lastName: 'node',
            email: 'user@node.com',
            birthdate: dayjs('1970-01-01', 'yyyy-mm-dd').toDate(),
            genre: 'M',
            phone: '2234456999',
            country: 'AR',
            enable: true,
            emailVerified: true
        };

        const userAdmin: IUserDomain = new User(payloadUserAdmin);
        await this.userRepository.save(userAdmin, '12345678');

        const payloadUserOperator = {
            firstName: 'operator',
            lastName: 'enable',
            email: 'operator@enable.com',
            birthdate: dayjs('1970-01-01', 'yyyy-mm-dd').toDate(),
            genre: 'M',
            phone: '2234456999',
            country: 'Argentina',
            enable: true,
            emailVerified: true,
            roles: [roleOperator]
        };

        const userOperator: IUserDomain = new User(payloadUserOperator);
        await this.userRepository.save(userOperator, '123456789');

        const payloadUserOperatorDisabled = {
            firstName: 'operator',
            lastName: 'disabled',
            email: 'operator@disabled.com',
            birthdate: dayjs('1970-01-01', 'yyyy-mm-dd').toDate(),
            genre: 'F',
            phone: '2234456999',
            country: 'Argentina',
            enable: false,
            emailVerified: false
        };

        const userOperatorDisabled: IUserDomain = new User(payloadUserOperatorDisabled);

        await this.userRepository.save(userOperatorDisabled, '1234567901');
        const payloadUserOperatorRoleDisabled = {
            firstName: 'operator',
            lastName: 'roleDisabled',
            email: 'operator@roleDisabled.com',
            birthdate: dayjs('1970-01-01', 'yyyy-mm-dd').toDate(),
            genre: 'F',
            phone: '2234456999',
            country: 'AR',
            enable: true,
            emailVerified: true
        };

        const userOperatorRoleDisabled: IUserDomain = new User(payloadUserOperatorRoleDisabled);
        await this.userRepository.save(userOperatorRoleDisabled, '1234567901');
    }
}

export default UserSeed;
