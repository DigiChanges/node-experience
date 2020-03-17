import {inject, injectable} from "inversify";
import IFormatResponder from "./IFormatResponder";

@injectable()
class FormatResponder implements IFormatResponder
{
    getFormatData = (data: any): any =>
    {
        return {
            'data': data
        };
    };
}

export default FormatResponder;