import { getRequestContext } from '../../../../Shared/Utils/RequestContext';
import ChangeMyPasswordPayload from '../../Payloads/User/ChangeMyPasswordPayload';
import IUserDomain from '../../Entities/IUserDomain';
import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';
import ValidatorSchema from '../../../../Main/Presentation/Utils/ValidatorSchema';
import ChangeMyPasswordSchemaValidation from '../../../Presentation/Validations/User/ChangeMyPasswordSchemaValidation';

class ChangeMyPasswordUseCase
{
    private repository: IUserRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: ChangeMyPasswordPayload): Promise<any>
    {
        await ValidatorSchema.handle(ChangeMyPasswordSchemaValidation, payload);

        const user: IUserDomain = await this.repository.getOne(payload.id);

        await this.repository.updatePassword(user.getId(), payload.password);

        return user;
    }
}

export default ChangeMyPasswordUseCase;
