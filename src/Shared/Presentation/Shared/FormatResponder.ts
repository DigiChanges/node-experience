import IFormatResponder, { ResponsePayload } from './IFormatResponder';

class FormatResponder implements IFormatResponder
{
    getFormatData = (data: unknown, metadata: Record<string, unknown>): ResponsePayload =>
    {
        return {
            data,
            metadata: metadata ?? undefined
        };
    };
}

export default FormatResponder;
