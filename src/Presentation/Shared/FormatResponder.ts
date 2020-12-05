import {injectable} from "inversify";
import IFormatResponder from "../../InterfaceAdapters/Shared/IFormatResponder";
import IStatusCode from "../../InterfaceAdapters/IPresentation/IStatusCode";

@injectable()
class FormatResponder implements IFormatResponder
{
    getFormatData = (data: any, statusCode: IStatusCode, metadata: any = null): any =>
    {
        return {
            'status': statusCode.status,
            'code': statusCode.code,
            'statusCode': statusCode.statusCode,
            'data': data,
            'metadata': metadata ? metadata : undefined
        };
    };
}

export default FormatResponder;
