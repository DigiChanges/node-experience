import IStatusCode from "../IPresentation/IStatusCode";

interface IFormatResponder
{
    getFormatData(data: any, statusCode: IStatusCode): any
}

export default IFormatResponder;
