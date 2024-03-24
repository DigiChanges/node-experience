
export interface IEncryption
{
    compare(chain: string, chainHashed: string): Promise<boolean>;
    decrypt(chain: string): Promise<string>;
    encrypt(chain: string): Promise<string>;
}
