import { Transformer } from '@digichanges/shared-experience';
import IResponseTransformer from '../../InterfaceAdapters/IResponseTransformer';
import Response from './Response/Response';

class ResponseTransformer extends Transformer
{
    public async transform(data: Response): Promise<IResponseTransformer>
    {
        return {
            id: data.id,
            message: data.message
        };
    }
}

export default ResponseTransformer;
