import { lazyInject } from '../../../inversify.config'
import IUser from "../../../InterfaceAdapters/IEntities/IUser";
import ChangeUserPasswordPayload from "../../../InterfaceAdapters/Payloads/Users/ChangeUserPasswordPayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import IEncryptionStrategy from "../../../InterfaceAdapters/Shared/IEncryptionStrategy";
import EncryptionFactory from "../../../Lib/Factories/EncryptionFactory";
import {REPOSITORIES} from "../../../repositories";

class ChangeUserPasswordUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;
    private encryption: IEncryptionStrategy;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: ChangeUserPasswordPayload): Promise<IUser>
    {
        const id = payload.id();
        const user: IUser = await this.repository.findOne(id);

        user.password = await this.encryption.encrypt(payload.newPassword());

        await this.repository.save(user);

        return user;
    }
}

export default ChangeUserPasswordUseCase;
