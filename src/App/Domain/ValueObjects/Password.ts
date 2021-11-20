import { IEncryption } from '@digichanges/shared-experience';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';
import InvalidPasswordException from '../Exceptions/InvalidPasswordException';

class Password
{
    private value: string;
    private encryption: IEncryption;

    constructor(data: string, min = 3, max = 10)
    {
        this.encryption = EncryptionFactory.create();
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
