import { lazyInject } from '../../../inversify.config'
import {SERVICES} from "../../../services";
import UserRepPayload from "../../../InterfaceAdapters/Payloads/Users/UserRepPayload";
import IUser from "../../../InterfaceAdapters/IEntities/IUser";
import IUserService from "../../../InterfaceAdapters/IServices/IUserService";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import {REPOSITORIES} from "../../../repositories";
import EncryptionFactory from "../../../Lib/Factories/EncryptionFactory";

class SaveUserUseCase
{
    @lazyInject(SERVICES.IUserService)
    private service: IUserService;

    constructor(@inject(REPOSITORIES.IUserRepository) repository: IUserRepository)
    {
        this.repository = repository;
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: UserRepPayload): Promise<IUser>
    {
         const user: IUser = new User();
        user.firstName = payload.firstName();
        user.lastName = payload.lastName();
        user.email = payload.email();
        user.password = await this.encryption.encrypt(payload.password());
        user.enable = payload.enable();
        user.confirmationToken = payload.confirmationToken();
        user.passwordRequestedAt = payload.passwordRequestedAt();
        user.permissions = payload.permissions();
        user.roles = payload.roles();
        user.isSuperAdmin = payload.isSuperAdmin();

        await this.repository.save(user);

        return user;
    }
}

export default SaveUserUseCase;
