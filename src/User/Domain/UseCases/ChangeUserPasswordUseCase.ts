import ChangeUserPasswordPayload from '../Payloads/ChangeUserPasswordPayload';
import IUserDomain from '../Entities/IUserDomain';
import Password from '../../../App/Domain/ValueObjects/Password';
import MainConfig from '../../../Config/mainConfig';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import IUserRepository from '../../Infrastructure/Repositories/IUserRepository';

class ChangeUserPasswordUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        const { id } = payload;
        const user: IUserDomain = await this.repository.getOne(id);

        const { minLength, maxLength } = MainConfig.getInstance().getConfig().validationSettings.password;

        user.password = await (new Password(payload.password, minLength, maxLength)).ready();

        return await this.repository.update(user);
    }
}

export default ChangeUserPasswordUseCase;
