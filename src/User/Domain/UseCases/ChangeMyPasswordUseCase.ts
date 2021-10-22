import ChangeMyPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeMyPasswordPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';
import PasswordWrongException from '../../../Auth/Domain/Exceptions/PasswordWrongException';
import Password from '../../../App/Domain/ValueObjects/Password';
import { IEncryption } from '@digichanges/shared-experience';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';

class ChangeMyPasswordUseCase
{
    @containerFactory(SERVICES.IUserService)
    private userService: UserService;

    private encryption: IEncryption;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: ChangeMyPasswordPayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        const user: IUserDomain = await this.userService.getOne(id);

        if (! await this.encryption.compare(payload.getCurrentPassword(), user.password.toString()))
        {
            throw new PasswordWrongException();
        }

        const password = new Password(payload.getPassword());
        await password.ready();
        user.password = password;

        return await this.userService.persistPassword(user, payload);
    }
}

export default ChangeMyPasswordUseCase;
