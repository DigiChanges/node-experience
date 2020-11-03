import { lazyInject } from '../../../inversify.config'
import ChangeMyPasswordPayload from "../../../InterfaceAdapters/Payloads/Users/ChangeMyPasswordPayload";
import IEncryption from "../../../InterfaceAdapters/Shared/IEncryption";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import EncryptionFactory from "../../../Infrastructure/Factories/EncryptionFactory";
import {REPOSITORIES} from "../../../repositories";
import IUserDomain from "../../../InterfaceAdapters/IDomain/IUserDomain";
import PasswordWrongException from "../../Exceptions/PasswordWrongException";

class ChangeMyPasswordUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;
    private encryption: IEncryption;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: ChangeMyPasswordPayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        const user = await this.repository.getOne(id);

        if(! await this.encryption.compare(payload.getCurrentPassword(), user.password))
        {
            throw new PasswordWrongException();
        }

        user.password = await this.encryption.encrypt(payload.getNewPassword());

        return await this.repository.save(user);
    }
}

export default ChangeMyPasswordUseCase;
