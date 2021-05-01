import {injectable} from 'inversify';
import {IStatusCode} from '@digichanges/shared-experience';

import IFormatResponder from '../../../Shared/InterfaceAdapters/IFormatResponder';

@injectable()
class FormatResponder implements IFormatResponder
{
    getFormatData = (data: any, statusCode: IStatusCode, metadata: any = null): any =>
    {
        return {
            status: statusCode.status,
            code: statusCode.code,
            statusCode: statusCode.statusCode,
            data,
            metadata: metadata ? metadata : undefined
        };
    };
}

export default FormatResponder;
