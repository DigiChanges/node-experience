import {IEncryption} from "@digichanges/shared-experience";

import ChangeUserPasswordPayload from "../../../InterfaceAdapters/Payloads/Users/ChangeUserPasswordPayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import EncryptionFactory from "../../../Infrastructure/Factories/EncryptionFactory";
import {REPOSITORIES} from "../../../repositories";
import IUserDomain from "../../../InterfaceAdapters/IDomain/IUserDomain";
import ContainerFactory from "../../../Infrastructure/Factories/ContainerFactory";

class ChangeUserPasswordUseCase
{
    private repository: IUserRepository;
    private encryption: IEncryption;

    constructor()
    {
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
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
