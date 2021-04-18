import {IEncryption} from '@digichanges/shared-experience';

import AuthPayload from '../../InterfaceAdapters/Payloads/AuthPayload';
import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';
import EncryptionFactory from '../../../App/Infrastructure/Factories/EncryptionFactory';
import TokenFactory from '../../../App/Infrastructure/Factories/TokenFactory';

import {REPOSITORIES} from '../../../repositories';

import BadCredentialsException from '../Exceptions/BadCredentialsException';
import UserDisabledException from '../../../User/Domain/Exceptions/UserDisabledException';
import RoleDisabledException from '../../../Role/Domain/Exceptions/RoleDisabledException';
import ContainerFactory from '../../../App/Infrastructure/Factories/ContainerFactory';

class LoginUseCase
{
    private repository: IUserRepository;
    private encryption: IEncryption;
    private tokenFactory: TokenFactory;

    constructor()
    {
        this.tokenFactory = new TokenFactory();
        this.encryption = EncryptionFactory.create();
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
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
