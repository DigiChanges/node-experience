export interface IPaginatorTransformer
{
    total: number;
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