import {IStatusCode} from '@digichanges/shared-experience';

interface IFormatResponder
{
    getFormatData(data: any, statusCode: IStatusCode, metadata: Record<string, any> | null): any
}

export default IFormatResponder;
