import { lazyInject } from '../../../inversify.config'
import ChangeMyPasswordPayload from "../../../InterfaceAdapters/Payloads/Users/ChangeMyPasswordPayload";
import ErrorException from "../../../Application/Shared/ErrorException";
import IEncryptionStrategy from "../../../InterfaceAdapters/Shared/IEncryptionStrategy";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import EncryptionFactory from "../../../Infrastructure/Factories/EncryptionFactory";
import StatusCode from "../../../Presentation/Shared/StatusCode";
import {REPOSITORIES} from "../../../repositories";
import IUserDomain from "../../../InterfaceAdapters/IDomain/IUserDomain";

class ChangeMyPasswordUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;
    private encryption: IEncryptionStrategy;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: ChangeMyPasswordPayload): Promise<IUserDomain>
    {
        const id = payload.id();
        const user = await this.repository.getOne(id);

        if(! await this.encryption.compare(payload.currentPassword(), user.password))
        {
            throw new ErrorException(StatusCode.HTTP_FORBIDDEN, 'Your current password is wrong');
        }

        user.password = await this.encryption.encrypt(payload.newPassword());

        return await this.repository.save(user);
    }
}

export default ChangeMyPasswordUseCase;
