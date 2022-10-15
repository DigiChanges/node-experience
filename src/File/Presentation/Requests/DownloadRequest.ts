import IdRequest from '../../../Shared/Presentation/Requests/IdRequest';
import { toInteger } from 'lodash';
import VersionPayload from '../../Domain/Payloads/VersionPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';

class DownloadRequest extends IdRequest implements VersionPayload, IdPayload
{
    private readonly _version: number;

    constructor({ id, query }: any)
    {
        super({ id });
        this._version = query?.version ? toInteger(query.version) : null;
    }

    get version(): number
    {
        return this._version;
    }
}

export default DownloadRequest;
