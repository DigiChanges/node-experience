import {IEncryption} from '@digichanges/shared-experience';

import ChangeUserPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeUserPasswordPayload';
import IUserRepository from '../../InterfaceAdapters/IUserRepository';
import EncryptionFactory from '../../../App/Infrastructure/Factories/EncryptionFactory';
import {REPOSITORIES} from '../../../repositories';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import {containerFactory} from '../../../App/Infrastructure/Factories/ContainerFactory';

class ChangeUserPasswordUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
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
