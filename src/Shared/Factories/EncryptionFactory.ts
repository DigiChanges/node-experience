import BcryptEncryptionStrategy from '../Encryption/BcryptEncryptionStrategy';
import Md5EncryptionStrategy from '../Encryption/Md5EncryptionStrategy';
import Config from 'config';
import { IEncryption } from '@digichanges/shared-experience';

type EncryptionConfig = 'bcrypt' | 'md5';

class EncryptionFactory
{
    static create(encryptionConfig: EncryptionConfig = Config.get('encryption.encryptionDefault')): IEncryption
    {
        const encryptions = {
            bcrypt: BcryptEncryptionStrategy,
            md5: Md5EncryptionStrategy
        };

        return new encryptions[encryptionConfig]();
    }
}

export default EncryptionFactory;
