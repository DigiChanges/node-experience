import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import IdPayload from '../../../../Shared/Presentation/Requests/IdPayload';
import ValidatorSchema from '../../../../Shared/Presentation/Shared/ValidatorSchema';
import IdSchemaValidation from '../../../../Shared/Presentation/Validations/IdSchemaValidation';

class ActiveUserUseCase
{
    private repository: IUserRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: IdPayload): Promise<void>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const { id } = payload;
        const user = await this.repository.getOne(id);

        await this.repository.active(user);
    }
}

export default ActiveUserUseCase;
