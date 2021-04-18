import IdPayload from '../../../App/InterfaceAdapters/Payloads/IdPayload';
import IUserRepository from '../../InterfaceAdapters/IUserRepository';
import {REPOSITORIES} from '../../../repositories';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import ContainerFactory from '../../../App/Infrastructure/Factories/ContainerFactory';

class GetUserUseCase
{
    private repository: IUserRepository;

    constructor()
    {
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
    }

    async handle(payload: IdPayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        return await this.repository.getOne(id);
    }
}

export default GetUserUseCase;
