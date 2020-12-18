import { lazyInject } from '../../../inversify.config';
import AuthPayload from "../../../InterfaceAdapters/Payloads/Auth/AuthPayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import IEncryption from "../../../InterfaceAdapters/Shared/IEncryption";
import EncryptionFactory from "../../../Infrastructure/Factories/EncryptionFactory";
import TokenFactory from "../../../Infrastructure/Factories/TokenFactory";

import {REPOSITORIES} from "../../../repositories";

import BadCredentialsException from "../../Exceptions/BadCredentialsException";
import UserDisabledException from "../../Exceptions/UserDisabledException";
import RoleDisabledException from "../../Exceptions/RoleDisabledException";

class LoginUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
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

        if(user.enable === false)
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

        return this.tokenFactory.token(user);
    }
}

export default LoginUseCase;
