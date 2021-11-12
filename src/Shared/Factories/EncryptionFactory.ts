import { IEncryption } from '@digichanges/shared-experience';
import MainConfig from '../../Config/mainConfig';
import BcryptEncryptionStrategy from '../Encryption/BcryptEncryptionStrategy';
import Md5EncryptionStrategy from '../Encryption/Md5EncryptionStrategy';

class EncryptionFactory
{
    static create(encryptionConfig: string = MainConfig.getInstance().getConfig().encryption.default): IEncryption
    {
        const encryptions: Record<string, any>  = {
            bcrypt: BcryptEncryptionStrategy,
            md5: Md5EncryptionStrategy
        };

        return new encryptions[encryptionConfig]();
    }
}

export default EncryptionFactory;
