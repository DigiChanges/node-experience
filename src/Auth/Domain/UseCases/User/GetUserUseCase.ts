import container from '../../../../register';
import { IdPayload } from '@digichanges/shared-experience';
import IUserDomain from '../../Entities/IUserDomain';
import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';
import ValidatorSchema from '../../../../Main/Presentation/Utils/ValidatorSchema';
import IdSchemaValidation from '../../../../Main/Presentation/Validations/IdSchemaValidation';
import IRoleRepository from 'Auth/Infrastructure/Repositories/Role/IRoleRepository';
import IRoleDomain from '../../Entities/IRoleDomain';

class GetUserUseCase
{
    private repository: IUserRepository;
    private roleRepository: IRoleRepository;

    constructor()
    {
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
        this.roleRepository = container.resolve<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: IdPayload): Promise<{ user: IUserDomain, roles: IRoleDomain[] }>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const user = await this.repository.getOne(payload.id);
        const roles = await this.roleRepository.searchByUserId(payload.id);

        return {
            user,
            roles
        };
    }
}

export default GetUserUseCase;
