import {injectable} from "inversify";
import IFormatResponder from "./IFormatResponder";

@injectable()
class FormatResponder implements IFormatResponder
{
    getFormatData = (data: any, statusHttpCode: any): any =>
    {
        return {
            'code': statusHttpCode.code,
            'statusCode': statusHttpCode.statusCode,
            'status': statusHttpCode.status,
            'data': data
        };
    };
}

export default FormatResponder;