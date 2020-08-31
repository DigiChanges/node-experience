import IEncryptionStrategy from "../../InterfaceAdapters/Shared/IEncryptionStrategy";
import BcryptEncryptionStrategy from "../Encryption/BcryptEncryptionStrategy";
import Md5EncryptionStrategy from "../Encryption/Md5EncryptionStrategy";
import Config from "config";

class EncryptionFactory
{
    static create(encryptionConfig: string = Config.get('encryptionDefault')): IEncryptionStrategy {
        if(encryptionConfig === Config.get('encryption.bcrypt.type')){
            return new BcryptEncryptionStrategy();
        }
        if(encryptionConfig === Config.get('encryption.md5.type')){
            return new Md5EncryptionStrategy();
        }
    }
}

export default EncryptionFactory;
