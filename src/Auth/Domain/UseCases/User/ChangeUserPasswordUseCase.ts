import ChangeUserPasswordPayload from '../../Payloads/User/ChangeUserPasswordPayload';
import IUserDomain from '../../Entities/IUserDomain';
import Password from '../../../../Shared/Domain/ValueObjects/Password';
import MainConfig from '../../../../Config/MainConfig';
import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/IUserRepository';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';

class ChangeUserPasswordUseCase
{
    private repository: IUserRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }

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
