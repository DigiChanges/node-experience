import {IEncryption} from '@digichanges/shared-experience';

import AuthPayload from '../../InterfaceAdapters/Payloads/AuthPayload';
import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';
import TokenFactory from '../../../Shared/Factories/TokenFactory';

import {REPOSITORIES} from '../../../repositories';

import BadCredentialsException from '../Exceptions/BadCredentialsException';
import UserDisabledException from '../../../User/Domain/Exceptions/UserDisabledException';
import RoleDisabledException from '../../../Role/Domain/Exceptions/RoleDisabledException';
import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';

class LoginUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;
    private encryption: IEncryption;
    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: AuthPayload)
    {
        const email = payload.getEmail();
        const password = payload.getPassword();
        const user =  await this.repository.getOneByEmail(email);

        if (user.enable === false)
        {
            throw new UserDisabledException();
        }

        const roleDisabled = user.getRoles().find(role => role.enable === false);

        if (roleDisabled)
        {
            throw new RoleDisabledException();
        }

        if (! await this.encryption.compare(password, user.password))
        {
            throw new BadCredentialsException();
        }

        return this.tokenFactory.createToken(user);
    }
}

export default LoginUseCase;
