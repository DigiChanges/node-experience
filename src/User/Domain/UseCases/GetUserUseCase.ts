import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IUserRepository from '../../InterfaceAdapters/IUserRepository';
import { REPOSITORIES } from '../../../Config/repositories';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';

class GetUserUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: IdPayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        return await this.repository.getOne(id);
    }
}

export default GetUserUseCase;
