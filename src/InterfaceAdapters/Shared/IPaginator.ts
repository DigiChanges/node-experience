
interface IPaginator {
    paginate(): Promise<any>;
    getTotal(): number;
    getCount(): number;
    getCurrentUrl(): string;
    getNextUrl(): string;
    getExist(): boolean;
}

export default IPaginator;