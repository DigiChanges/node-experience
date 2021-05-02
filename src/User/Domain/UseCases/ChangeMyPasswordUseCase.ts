import {IEncryption} from '@digichanges/shared-experience';

import ChangeMyPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeMyPasswordPayload';
import IUserRepository from '../../InterfaceAdapters/IUserRepository';
import EncryptionFactory from '../../../App/Infrastructure/Factories/EncryptionFactory';
import {REPOSITORIES} from '../../../repositories';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import PasswordWrongException from '../../../Auth/Domain/Exceptions/PasswordWrongException';
import {containerFactory} from '../../../App/Infrastructure/Factories/ContainerFactory';

class ChangeMyPasswordUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
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

        if (! await this.encryption.compare(payload.getCurrentPassword(), user.password))
        {
            throw new PasswordWrongException();
        }

        user.password = await this.encryption.encrypt(payload.getNewPassword());

        return await this.repository.save(user);
    }
}

export default ChangeMyPasswordUseCase;
