import bcrypt from 'bcrypt';
import MainConfig from '../../../Config/MainConfig';
import DecryptForbiddenException from '../../Exceptions/DecryptForbiddenException';
import IEncryption from './IEncryption';

class BcryptEncryptionStrategy implements IEncryption
{
    async compare(chain: string, chainHashed: string): Promise<boolean>
    {
        return await bcrypt.compare(chain, chainHashed);
    }

    async decrypt(chain: string): Promise<string>
    {
        throw new DecryptForbiddenException();
    }

    async encrypt(chain: string): Promise<string>
    {
        const config = MainConfig.getInstance();
        const saltRounds: number = config.getConfig().encryption.bcrypt.saltRounds;

        return await bcrypt.hash(chain, saltRounds);
    }
}

export default BcryptEncryptionStrategy;
