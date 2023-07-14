import QueryString from 'qs';
import MainConfig from '../../Config/MainConfig';
import { IPagination } from '@digichanges/shared-experience';

class Pagination implements IPagination
{
    private readonly limit: number;
    private readonly offset: number;
    private readonly exist: boolean = false;
    private pagination: any;
    private readonly host: string;
    private readonly url: string;

    constructor(query: QueryString.ParsedQs, url: string)
    {
        this.url = url;
        this.pagination = query.pagination;
        this.limit = query?.pagination ? +this.pagination.limit : 10;
        this.offset = query?.pagination ? +this.pagination.offset : 0;
        this.exist = query?.pagination !== undefined;
        const config = MainConfig.getInstance();
        this.host = config.getConfig().url.urlApi;
    }

    getPath(): string
    {
        return this.host;
    }

    getLimit(): number
    {
        return this.limit;
    }

    getOffset(): number
    {
        return this.offset;
    }

    getCurrentUrl(): string
    {
        return this.exist ? `${this.host}/${this.url.replace('/api/', '')}` : '';
    }

    // TODO: Refactoring with querystrings to reform query without harcoding URI
    getNextUrl(): string
    {
        let url = '';

        if (this.exist)
        {
            const offset = this.offset + this.limit;

            url = `${this.host}/${this.url.replace('/api/', '')}`;
            const searchValue = `pagination[offset]=${this.pagination.offset}`;
            const newValue = `pagination[offset]=${offset}`;

            url = url.replace(searchValue, newValue);
        }

        return url;
    }

    getExist(): boolean
    {
        return this.exist;
    }
}

export default Pagination;
