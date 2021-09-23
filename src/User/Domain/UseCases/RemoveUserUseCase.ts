import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IUserRepository from '../../InterfaceAdapters/IUserRepository';
import { REPOSITORIES } from '../../../Config/repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';

class RemoveUserUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: IdPayload): Promise<any>
    {
        const id = payload.getId();
        return await this.repository.delete(id);
    }
}

export default RemoveUserUseCase;
