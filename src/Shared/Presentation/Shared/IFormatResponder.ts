
export interface ResponsePayload
{
    data: unknown;
    metadata?: unknown;
}

interface IFormatResponder
{
    getFormatData(data: unknown, metadata: Record<string, unknown> | null): ResponsePayload
}

export default IFormatResponder;
