import {inject, injectable} from "inversify";
import {REPOSITORIES} from "../repositories";
import IUserRepository from "../Repositories/Contracts/IUserRepository";
import AuthPayload from "../Payloads/Auth/AuthPayload";
import TokenFactory from "../Lib/Factories/TokenFactory";
import IEncription from "../Lib/Encription/IEncription";
import {TYPES} from "../types";
import ErrorException from "../Lib/ErrorException";
import StatusCode from "../Lib/StatusCode";
import IToken from "../Lib/Auth/IToken"

@injectable()
class AuthService
{
    @inject(TYPES.IEncription)
    private encryptionHandler: IEncription;
    private repository: IUserRepository;
    private tokenFactory: TokenFactory;

    constructor(@inject(REPOSITORIES.IUserRepository) repository: IUserRepository)
    {
        this.repository = repository;
        this.tokenFactory = new TokenFactory();
    }

    public async login (payload: AuthPayload): Promise<IToken>
    {
        const email = payload.email();
        const password = payload.password();
        const user =  await this.repository.getOneByEmail(email);

        if (!this.encryptionHandler.compare(password, user.password))
        {
            throw new ErrorException(StatusCode.HTTP_FORBIDDEN, 'Error credentials');
        }

        return await this.tokenFactory.token(user);
    }
}

export default AuthService;