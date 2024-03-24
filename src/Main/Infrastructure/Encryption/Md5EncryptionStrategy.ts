import md5 from 'md5';
import { IEncryption } from './IEncryption';
import { DecryptForbiddenException } from '../Exceptions/DecryptForbiddenException';

export class Md5EncryptionStrategy implements IEncryption
{
    async compare(chain: string, chainHashed: string): Promise<boolean>
    {
        return md5(chain) === chainHashed;
    }

    async decrypt(chain: string): Promise<string>
    {
        throw new DecryptForbiddenException();
    }

    async encrypt(chain: string): Promise<string>
    {
        return md5(chain);
    }
}
