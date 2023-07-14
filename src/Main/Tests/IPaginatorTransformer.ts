export interface IPaginatorTransformer
{
    total: number;
    offset: number;
    limit: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    from: number;
    to: number;
    path: string;
    firstUrl: string;
    lastUrl: string;
    nextUrl: string;
    prevUrl: string;
    currentUrl: string;
}
