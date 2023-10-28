import container from '../../../../register';
import { IdPayload } from '@digichanges/shared-experience';
import IUserDomain from '../../Entities/IUserDomain';
import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';
import ValidatorSchema from '../../../../Main/Presentation/Utils/ValidatorSchema';
import IdSchemaValidation from '../../../../Main/Presentation/Validations/IdSchemaValidation';

class RemoveUserUseCase
{
    private repository: IUserRepository;

    constructor()
    {
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: IdPayload): Promise<IUserDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const { id } = payload;
        return await this.repository.delete(id);
    }
}

export default RemoveUserUseCase;
