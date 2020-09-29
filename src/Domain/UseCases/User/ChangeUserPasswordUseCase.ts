import { lazyInject } from '../../../inversify.config'
import ChangeUserPasswordPayload from "../../../InterfaceAdapters/Payloads/Users/ChangeUserPasswordPayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import IEncryption from "../../../InterfaceAdapters/Shared/IEncryption";
import EncryptionFactory from "../../../Infrastructure/Factories/EncryptionFactory";
import {REPOSITORIES} from "../../../repositories";
import IUserDomain from "../../../InterfaceAdapters/IDomain/IUserDomain";

class ChangeUserPasswordUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;
    private encryption: IEncryption;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        const user: IUserDomain = await this.repository.getOne(id);

        user.password = await this.encryption.encrypt(payload.getNewPassword());

        await this.repository.save(user);

        return user;
    }
}

export default ChangeUserPasswordUseCase;
