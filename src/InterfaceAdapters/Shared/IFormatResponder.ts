import IStatusCode from "../IPresentation/IStatusCode";

interface IFormatResponder
{
    getFormatData(data: any, statusCode: IStatusCode, metadata: any | null): any
}

export default IFormatResponder;
