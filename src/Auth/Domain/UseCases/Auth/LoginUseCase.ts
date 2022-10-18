import AuthPayload from '../../Payloads/Auth/AuthPayload';
import IUserRepository from '../../../Infrastructure/Repositories/IUserRepository';
import TokenFactory from '../../../../Shared/Factories/TokenFactory';

import { FACTORIES, REPOSITORIES } from '../../../../Config/Injects';

import BadCredentialsException from '../../Exceptions/BadCredentialsException';

import UserDisabledException from '../../Exceptions/UserDisabledException';
import RoleDisabledException from '../../Exceptions/RoleDisabledException';

import IToken from '../../Models/IToken';
import UnverifiedUserException from '../../Exceptions/UnverifiedUserException';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import IEncryption from '../../../../Shared/Infrastructure/Encryption/IEncryption';

class LoginUseCase
{
    private readonly repository: IUserRepository;
    private encryption: IEncryption;
    private tokenFactory: TokenFactory;

    constructor()
    {
        const { container } = getRequestContext();

        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
        this.encryption = container.resolve<IEncryption>(FACTORIES.BcryptEncryptionStrategy);
        this.tokenFactory = new TokenFactory();
    }

    async handle(payload: AuthPayload): Promise<IToken>
    {
        const email = payload.email;
        const password = payload.password;

        const user = await this.repository.getOneBy({ email }, { populate: ['roles'], initThrow: false });

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
