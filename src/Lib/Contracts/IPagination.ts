
interface IPagination {
     getLimit(): number;
     getOffset(): number;
     getCurrentUrl(): string;
     getNextUrl(): string;
}

export default IPagination