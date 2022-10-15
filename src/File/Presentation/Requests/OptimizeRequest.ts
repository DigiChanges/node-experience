import IdRequest from '../../../Shared/Presentation/Requests/IdRequest';
import FileOptionsQueryRequest from './FileOptionsQueryRequest';
import OptimizePayload from '../../Domain/Payloads/OptimizePayload';
import { Mixin } from 'ts-mixer';

class OptimizeRequest extends Mixin(IdRequest, FileOptionsQueryRequest) implements OptimizePayload
{
    constructor(data: Record<string, any>)
    {
        super(data);
    }
}

export default OptimizeRequest;
