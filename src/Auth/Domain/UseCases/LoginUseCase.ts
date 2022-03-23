import AuthPayload from '../Payloads/AuthPayload';
import IUserRepository from '../../../User/Infrastructure/Repositories/IUserRepository';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';
import TokenFactory from '../../../Shared/Factories/TokenFactory';

import { REPOSITORIES } from '../../../Config/Injects/repositories';

import BadCredentialsException from '../Exceptions/BadCredentialsException';
import UserDisabledException from '../../../User/Domain/Exceptions/UserDisabledException';
import RoleDisabledException from '../../../Role/Domain/Exceptions/RoleDisabledException';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import IToken from '../Models/IToken';
import UnverifiedUserException from '../../../User/Domain/Exceptions/UnverifiedUserException';

class LoginUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    private encryption = EncryptionFactory.create();

    private tokenFactory = new TokenFactory();

    async handle(payload: AuthPayload): Promise<IToken>
    {
        const email = payload.email;
        const password = payload.password;
        const user = await this.repository.getOneBy({ email }, { populate: 'roles', initThrow: false });

        if (!user)
        {
            throw new BadCredentialsException();
        }

        if (!user.verify)
        {
            throw new UnverifiedUserException();
        }

        if (!user.enable)
        {
            throw new UserDisabledException();
        }

        const roleDisabled = user.getRoles().find(role => !role.enable);

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
