import UserActivePayload from '../Payloads/UserActivePayload';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import IUserRepository from '../../Infrastructure/Repositories/IUserRepository';

class ActiveUserUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: UserActivePayload): Promise<void>
    {
        const { email } = payload;
        const user = await this.repository.getOneByEmail(email);

        user.enable = true;
        user.verify = true;

        await this.repository.save(user);
    }
}

export default ActiveUserUseCase;
