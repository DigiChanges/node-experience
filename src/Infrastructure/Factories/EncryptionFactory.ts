import BcryptEncryptionStrategy from "../Encryption/BcryptEncryptionStrategy";
import Md5EncryptionStrategy from "../Encryption/Md5EncryptionStrategy";
import Config from "config";
import {IEncryption} from "@digichanges/shared-experience";

class EncryptionFactory
{
    static create(encryptionConfig: string = Config.get('encryption.encryptionDefault')): IEncryption
    {
       const encryptions: any = {
            bcrypt : new BcryptEncryptionStrategy(),
            md5: new Md5EncryptionStrategy()
        };

        return encryptions[encryptionConfig];
    }
}

export default EncryptionFactory;
