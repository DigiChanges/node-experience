import IEncryptionStrategy from "../../InterfaceAdapters/Shared/IEncryptionStrategy";
import md5 from "md5";
import ErrorException from "../../Application/Shared/ErrorException";
import StatusCode from "../../Presentation/Shared/StatusCode";

class Md5EncryptionStrategy implements IEncryptionStrategy
{
    async compare(chain: string, chainHashed: string): Promise<boolean>
    {
        if(await md5(chain) === chainHashed){
            return true;
        }
        return false;
    }

    async decrypt(chain: string): Promise<string>
    {
        throw new ErrorException(StatusCode.HTTP_NOT_ACCEPTABLE, 'Decrypt forbidden')
    }

    async encrypt(chain: string): Promise<string>
    {
       return await md5(chain);
    }

}

export default Md5EncryptionStrategy;