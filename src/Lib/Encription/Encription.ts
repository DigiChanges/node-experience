import IEncriptionStrategy from "./IEncriptionStrategy";
import IEncription from "./IEncription";
import {inject, injectable} from "inversify";
import {TYPES} from "../../types";

@injectable()
class Encription implements IEncription
{
    @inject(TYPES.IEncriptionStrategy)
    private encriptionStrategy: IEncriptionStrategy;

    async compare(chain: string, chainHashed: string): Promise<boolean>
    {
        return await this.encriptionStrategy.compare(chain, chainHashed);
    }

    async decrypt(chain: string): Promise<string>
    {
        return await this.encriptionStrategy.decrypt(chain);
    }

    async encrypt(chain: string): Promise<string>
    {
        return await this.encriptionStrategy.encrypt(chain);
    }
}

export default Encription;