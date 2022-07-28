import AuthPayload from '../Payloads/AuthPayload';
import IUserRepository from '../../../User/Infrastructure/Repositories/IUserRepository';
import TokenFactory from '../../../Shared/Factories/TokenFactory';

import { FACTORIES, REPOSITORIES } from '../../../Config/Injects';

import BadCredentialsException from '../Exceptions/BadCredentialsException';
import UserDisabledException from '../../../User/Domain/Exceptions/UserDisabledException';
import RoleDisabledException from '../../../Role/Domain/Exceptions/RoleDisabledException';
import IToken from '../Models/IToken';
import UnverifiedUserException from '../../../User/Domain/Exceptions/UnverifiedUserException';
import { IEncryption } from '@digichanges/shared-experience';
import { DependencyContainer } from 'tsyringe';
import { getRequestContext } from '../../../App/Presentation/Shared/RequestContext';

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
