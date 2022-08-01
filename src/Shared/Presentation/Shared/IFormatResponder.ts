
interface IFormatResponder
{
    getFormatData(data: unknown, metadata: Record<string, any> | null): any
}

export default IFormatResponder;
