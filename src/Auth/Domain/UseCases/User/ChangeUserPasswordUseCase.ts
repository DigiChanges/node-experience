import ChangeUserPasswordPayload from '../../Payloads/User/ChangeUserPasswordPayload';
import IUserDomain from '../../Entities/IUserDomain';
import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';
import { getRequestContext } from '../../../../Shared/Utils/RequestContext';
import ValidatorSchema from '../../../../Main/Presentation/Utils/ValidatorSchema';
import ChangeUserPasswordSchemaValidation
    from '../../../Presentation/Validations/User/ChangeUserPasswordSchemaValidation';

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
        await ValidatorSchema.handle(ChangeUserPasswordSchemaValidation, payload);

        const { id } = payload;
        const user: IUserDomain = await this.repository.getOne(id);

        await this.repository.updatePassword(user.getId(), payload.password);

        return user;
    }
}

export default ChangeUserPasswordUseCase;
