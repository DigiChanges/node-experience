
export interface IPagination
{
    getLimit(): number;
    getPath(): string;
    getOffset(): number;
    setOffset(offset: number): void;
    getPage(): number;
    getCurrentUrl(): string;
    getNextUrl(): string;
    getExist(): boolean;
}
