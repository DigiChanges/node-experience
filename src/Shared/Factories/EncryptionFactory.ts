import { IEncryption } from '@digichanges/shared-experience';
import { mainConfig } from '../../Config/mainConfig';
import BcryptEncryptionStrategy from '../Encryption/BcryptEncryptionStrategy';
import Md5EncryptionStrategy from '../Encryption/Md5EncryptionStrategy';

class EncryptionFactory
{
    static create(encryptionConfig: string = mainConfig.encryption.default): IEncryption
    {
        const encryptions: Record<string, any>  = {
            bcrypt: BcryptEncryptionStrategy,
            md5: Md5EncryptionStrategy
        };

        return new encryptions[encryptionConfig]();
    }
}

export default EncryptionFactory;
