import Config from 'config';
import bcrypt from 'bcrypt';
import {IEncryption} from '@digichanges/shared-experience';
import DecryptForbiddenException from '../Exceptions/DecryptForbiddenException';

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
        const saltRounds: number = Config.get('encryption.bcrypt.saltRounds');

        return await bcrypt.hash(chain, saltRounds);
    }
}

export default BcryptEncryptionStrategy;
