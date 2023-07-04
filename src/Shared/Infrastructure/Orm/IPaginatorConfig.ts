
interface IPaginatorConfig
{
    helper?: (data: unknown) => Promise<unknown>;
    metadata?: Record<string, unknown>;
}

export default IPaginatorConfig;
