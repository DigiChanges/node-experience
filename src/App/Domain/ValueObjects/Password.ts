import ErrorHttpException from '../../../App/Presentation/Shared/ErrorHttpException';
import { IEncryption, StatusCode } from '@digichanges/shared-experience';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';

class Password
{
    private value: string;
    private encryption: IEncryption;

    constructor(data: string)
    {
        this.encryption = EncryptionFactory.create();
        this.value = data;

        if (this.value.length <= 4)
        {
            // TODO: Refactor error - Add Domain Exception
            throw new ErrorHttpException(StatusCode.HTTP_BAD_REQUEST, { message: 'Error password' });
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
