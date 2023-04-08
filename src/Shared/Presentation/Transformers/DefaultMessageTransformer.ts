import Transformer from '../../../Shared/Presentation/Shared/Transformer';
import IDefaultMessageTransformer from './IDefaultMessageTransformer';
import ResponseMessageEnum from '../../Domain/Enum/ResponseMessageEnum';
import Base from '../../Domain/Entities/Base';

class DefaultMessageTransformer<T extends Base> extends Transformer
{
    readonly #typeResponse: string;

    constructor(response: ResponseMessageEnum)
    {
        super();
        this.#typeResponse = response;
    }

    public async transform(data: T): Promise<IDefaultMessageTransformer>
    {
        return {
            id: data?._id,
            message: this.#typeResponse
        };
    }
}

export default DefaultMessageTransformer;
