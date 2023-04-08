import InvalidPasswordException from '../Exceptions/InvalidPasswordException';
import IEncryption from '../../Infrastructure/Encryption/IEncryption';
import { getRequestContext } from '../../Presentation/Shared/RequestContext';
import { FACTORIES } from '../../../Config/Injects';

class Password
{
    private hashed: string;
    private value: string;
    private encryption: IEncryption;

    constructor(data: string, min = 3, max = 10)
    {
        const { container } = getRequestContext();
        this.encryption = container.resolve<IEncryption>(FACTORIES.BcryptEncryptionStrategy);
        this.value = data;

        if (this.value.length < min ||  this.value.length > max)
        {
            throw new InvalidPasswordException();
        }
    }

    public async ready(): Promise<Password>
    {
        this.value = await this.encryption.encrypt(this.value);
        return this;
    }

    public toString = (): string =>
    {
        return this.value;
    };
}

export default Password;
