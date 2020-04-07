import IEncriptionStrategy from "./IEncriptionStrategy";
import config from "../../../config/config";
import bcrypt from "bcrypt";
import {injectable} from "inversify";
import ErrorException from "../ErrorException";
import StatusCode from "../StatusCode";

@injectable()
class BcryptEncriptionStrategy implements IEncriptionStrategy
{
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
        const saltRounds = Number(config.encryption.saltRounds);

        return await bcrypt.hash(chain, saltRounds);
    }

}

export default BcryptEncriptionStrategy;