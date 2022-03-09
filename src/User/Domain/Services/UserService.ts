import IUserDomain from '../Entities/IUserDomain';
import IUserRepository from '../../Infrastructure/Repositories/IUserRepository';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import CheckUserRolePayload from '../Payloads/CheckUserRolePayload';
import IRoleRepository from '../../../Role/Infrastructure/Repositories/IRoleRepository';
import Password from '../../../App/Domain/ValueObjects/Password';
import UniqueService from '../../../App/Domain/Services/UniqueService';
import MainConfig from '../../../Config/mainConfig';
import AuthHelper from '../../../Shared/Helpers/AuthHelper';
import ChangeMyPasswordPayload from '../Payloads/ChangeMyPasswordPayload';
import User from '../Entities/User';
import UserSavePayload from '../Payloads/UserSavePayload';

class UserService
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    @containerFactory(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository;

    async create(payload: UserSavePayload)
    {
        const { minLength, maxLength } = MainConfig.getInstance().getConfig().validationSettings.password;

        const password = await (new Password(payload.password, minLength, maxLength)).ready();

        const user = new User({ ...payload, password });

        await this.validate(user);

        await this.repository.save(user);

        return user;
    }

    async getOne(id: string): Promise<IUserDomain>
    {
        return await this.repository.getOne(id);
    }

    async validate(user: IUserDomain): Promise<void>
    {
        AuthHelper.validatePermissions(user.permissions);

        void await UniqueService.validate<IUserDomain>({
            repository: REPOSITORIES.IUserRepository,
            validate: {
                email: user.email,
                documentNumber: user.documentNumber
            },
            refValue: user.getId()
        });
    }

    async checkIfUserHasRole(payload: CheckUserRolePayload): Promise<boolean>
    {
        const roles = payload.user.getRoles();

        roles.forEach((role) =>
        {
            if (role.slug === payload.roleToCheck)
            {
                return true;
            }
        });

        return false;
    }

    async updatePassword(user: IUserDomain, payload: ChangeMyPasswordPayload)
    {
        const { minLength, maxLength } = MainConfig.getInstance().getConfig().validationSettings.password;

        user.password = await (new Password(payload.password, minLength, maxLength)).ready();

        return await this.repository.update(user);
    }
}

export default UserService;
