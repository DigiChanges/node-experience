import IEncryptionStrategy from "../Encryption/IEncryptionStrategy";
import BcryptEncryptionStrategy from "../Encryption/BcryptEncryptionStrategy";
import Md5EncryptionStrategy from "../Encryption/Md5EncryptionStrategy";
import Config from "../../../config/config";

class EncryptionFactory {

    static create(encryptionConfig = Config.encryptionDefault): IEncryptionStrategy {
        if(encryptionConfig === Config.encryption.bcrypt.type){
            return new BcryptEncryptionStrategy();
        }
        if(encryptionConfig === Config.encryption.md5.type){
            return new Md5EncryptionStrategy();
        }
    }
}

export default EncryptionFactory;