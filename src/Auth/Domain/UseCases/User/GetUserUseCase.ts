import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import IdPayload from '../../../../Shared/Presentation/Requests/IdPayload';
import IUserDomain from '../../Entities/IUserDomain';
import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';
import ValidatorSchema from '../../../../Shared/Presentation/Shared/ValidatorSchema';
import IdSchemaValidation from '../../../../Shared/Presentation/Validations/IdSchemaValidation';

class GetUserUseCase
{
    private repository: IUserRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }
    async handle(payload: IdPayload): Promise<IUserDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        return this.repository.getOne(payload.id);
    }
}

export default GetUserUseCase;
