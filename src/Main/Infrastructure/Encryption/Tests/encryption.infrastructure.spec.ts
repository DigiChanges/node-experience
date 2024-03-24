import { IEncryption } from '../IEncryption';
import { BcryptEncryptionStrategy } from '../BcryptEncryptionStrategy';
import { Md5EncryptionStrategy } from '../Md5EncryptionStrategy';

describe('Encryption', () =>
{
    test('BcryptEncryptionStrategy', async() =>
    {
        try
        {
            const chain = '12345678';
            const encryption: IEncryption = new BcryptEncryptionStrategy();
            const hash = await encryption.encrypt(chain);
            const success = await encryption.compare(chain, hash);

            expect(success).toStrictEqual(true);

            await encryption.decrypt(hash);
        }
        catch (error: any)
        {
            expect(error.message).toStrictEqual('Decrypt forbidden.');
        }
    });

    test('Md5EncryptionStrategy', async() =>
    {
        try
        {
            const chain = '12345678';
            const encryption: IEncryption = new Md5EncryptionStrategy();
            const hash = await encryption.encrypt(chain);
            const success = await encryption.compare(chain, hash);

            expect(success).toStrictEqual(true);

            await encryption.decrypt(hash);
        }
        catch (error: any)
        {
            expect(error.message).toStrictEqual('Decrypt forbidden.');
        }
    });
});
