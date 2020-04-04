
interface IPaginator {
    paginate(): Promise<any>;
    getTotal(): number;
    getCount(): number;
    getCurrentUrl(): string;
    getNextUrl(): string;
}

export default IPaginator;