
interface IPaginator
{
    paginate(): Promise<unknown>;
    getTotal(): number;
    getPerPage(): number;
    getCurrentPage(): number;
    getLasPage(): number;
    getFrom(): number;
    getTo(): number;
    getPath(): string;
    getFirstUrl(): string;
    getLastUrl(): string;
    getNextUrl(): string | null;
    getPrevUrl(): string | null;
    getCurrentUrl(): string;
    getExist(): boolean;
    getMetadata(): Record<string, unknown>;
    getOffset(): number;
    getLimit(): number;
}

export default IPaginator;
