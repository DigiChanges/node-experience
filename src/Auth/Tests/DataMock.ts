import IPaginator from '../../Shared/Infrastructure/Orm/IPaginator';

export const responseIPaginator: IPaginator = {
    getCurrentPage(): number
    {
        return 0;
    }, getCurrentUrl(): string
    {
        return '';
    }, getExist(): boolean
    {
        return false;
    }, getFirstUrl(): string
    {
        return '';
    }, getFrom(): number
    {
        return 0;
    }, getLasPage(): number
    {
        return 0;
    }, getLastUrl(): string
    {
        return '';
    }, getLimit(): number
    {
        return 0;
    }, getMetadata(): Record<string, unknown>
    {
        return undefined;
    }, getNextUrl(): string | null
    {
        return undefined;
    }, getOffset(): number
    {
        return 0;
    }, getPath(): string
    {
        return '';
    }, getPerPage(): number
    {
        return 0;
    }, getPrevUrl(): string | null
    {
        return undefined;
    }, getTo(): number
    {
        return 0;
    }, getTotal(): number
    {
        return 0;
    }, paginate(): Promise<unknown>
    {
        return Promise.resolve(undefined);
    }
};
