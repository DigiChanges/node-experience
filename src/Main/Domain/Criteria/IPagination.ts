
export interface IPagination
{
    getLimit(): number;
    getPath(): string;
    getOffset(): number;
    getCurrentUrl(): string;
    getNextUrl(): string;
    getExist(): boolean;
}
