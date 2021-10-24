import { IEncryption } from '@digichanges/shared-experience';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';
import Config from 'config';
import InvalidPasswordException from '../Exceptions/InvalidPasswordException';

class Password
{
    private value: string;
    private encryption: IEncryption;

    constructor(data: string)
    {
        this.encryption = EncryptionFactory.create();
        this.value = data;

        const min = Config.get<number>('validationSettings.password.min');
        const max = Config.get<number>('validationSettings.password.max');

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

    public toString = () =>
    {
        return this.value;
    };
}

export default Password;
