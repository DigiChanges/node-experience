import {IStatusCode} from "@digichanges/shared-experience";

interface IFormatResponder
{
    getFormatData(data: any, statusCode: IStatusCode, metadata: any | null): any
}

export default IFormatResponder;
