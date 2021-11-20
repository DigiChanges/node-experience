import AuthPayload from '../../InterfaceAdapters/Payloads/AuthPayload';
import IUserRepository from '../../../User/InterfaceAdapters/IUserRepository';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';
import TokenFactory from '../../../Shared/Factories/TokenFactory';

import { REPOSITORIES } from '../../../repositories';

import BadCredentialsException from '../Exceptions/BadCredentialsException';
import UserDisabledException from '../../../User/Domain/Exceptions/UserDisabledException';
import RoleDisabledException from '../../../Role/Domain/Exceptions/RoleDisabledException';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import IToken from '../../InterfaceAdapters/IToken';
import UnverifiedUserException from '../../../User/Domain/Exceptions/UnverifiedUserException';

class LoginUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    private encryption = EncryptionFactory.create();

    private tokenFactory = new TokenFactory();

    async handle(payload: AuthPayload): Promise<IToken>
    {
        const email = payload.getEmail();
        const password = payload.getPassword();
        const user =  await this.repository.getOneByEmail(email);

        if (user.verify === false)
        {
            throw new UnverifiedUserException();
        }

        if (user.enable === false)
        {
            throw new UserDisabledException();
        }

        const roleDisabled = user.getRoles().find(role => role.enable === false);

        if (roleDisabled)
        {
            throw new RoleDisabledException();
        }

        if (! await this.encryption.compare(password, user.password.toString()))
        {
            throw new BadCredentialsException();
        }

        return this.tokenFactory.createToken(user);
    }
}

export default LoginUseCase;
