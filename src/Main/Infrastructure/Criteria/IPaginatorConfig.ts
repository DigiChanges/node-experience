
export interface IPaginatorConfig
{
    helper?: (data: unknown) => Promise<unknown>;
    metadata?: Record<string, unknown>;
}
