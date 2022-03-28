import { Transformer } from '@digichanges/shared-experience';
import IDefaultMessageTransformer from '../../InterfaceAdapters/IDefaultMessageTransformer';
import Response from './Response/DataResponseMessage';

class DefaultMessageTransformer extends Transformer
{
    public async transform(data: Response): Promise<IDefaultMessageTransformer>
    {
        return {
            id: data.id,
            message: data.message
        };
    }
}

export default DefaultMessageTransformer;
