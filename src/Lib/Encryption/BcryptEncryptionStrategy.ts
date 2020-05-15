import config from "../../../config/config";
import bcrypt from "bcrypt";
import ErrorException from "../ErrorException";
import StatusCode from "../StatusCode";
import IEncryptionStrategy from "./IEncryptionStrategy";

class BcryptEncryptionStrategy implements IEncryptionStrategy
{

    private encryptionConfig = config.encryption.bcrypt;

    async compare(chain: string, chainHashed: string): Promise<boolean>
    {
        return await bcrypt.compare(chain, chainHashed);
    }

    async decrypt(chain: string): Promise<string>
    {
        throw new ErrorException(StatusCode.HTTP_NOT_ACCEPTABLE, 'Decrypt forbidden')
    }

    async encrypt(chain: string): Promise<string>
    {
        const saltRounds = Number(this.encryptionConfig.saltRounds);

        return await bcrypt.hash(chain, saltRounds);
    }

}

export default BcryptEncryptionStrategy;