import { getRequestContext } from '../../../../Shared/Utils/RequestContext';
import { IdPayload } from '@digichanges/shared-experience';
import IUserDomain from '../../Entities/IUserDomain';
import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';
import ValidatorSchema from '../../../../Main/Presentation/Utils/ValidatorSchema';
import IdSchemaValidation from '../../../../Main/Presentation/Validations/IdSchemaValidation';

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
