import bcrypt from 'bcrypt';
import { IEncryption } from './IEncryption';
import { DecryptForbiddenException } from '../Exceptions/DecryptForbiddenException';

export class BcryptEncryptionStrategy implements IEncryption
{
    async compare(chain: string, chainHashed: string): Promise<boolean>
    {
        return await bcrypt.compare(chain, chainHashed);
    }

    async decrypt(chain: string): Promise<string>
    {
        throw new DecryptForbiddenException();
    }

    async encrypt(chain: string, saltRounds: number = 10): Promise<string>
    {
        return await bcrypt.hash(chain, saltRounds);
    }
}
