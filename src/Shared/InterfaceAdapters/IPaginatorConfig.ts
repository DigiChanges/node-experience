interface IPaginatorConfig
{
    helper?: (data: any) => Promise<any>;
    metadata?: Record<string, any>;
}

export default IPaginatorConfig;
