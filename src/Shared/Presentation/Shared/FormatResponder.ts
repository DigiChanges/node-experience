import IFormatResponder from './IFormatResponder';

class FormatResponder implements IFormatResponder
{
    getFormatData = (data: unknown, metadata: Record<string, unknown> = null): any =>
    {
        return {
            data,
            metadata: metadata ?? undefined
        };
    };
}

export default FormatResponder;
