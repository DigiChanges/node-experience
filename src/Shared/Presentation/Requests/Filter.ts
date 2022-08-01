import IFilter from './IFilter';
import { ParsedQs } from 'qs';

abstract class Filter implements IFilter
{
    private readonly filters: Map<string, any>;

    constructor(query: ParsedQs)
    {
        this.filters = new Map<string, any>();
        const queryFilters: any = query.filter ?? [];
        const defaultFilters: any = this.getDefaultFilters();
        const keys = this.getFields();

        defaultFilters.forEach((defaultFilter: any) =>
        {
            const defaultKey: string = Object.keys(defaultFilter)[0];
            const defaultValue: string = defaultFilter[defaultKey];

            this.filters.set(defaultKey, defaultValue);
        });

        const newFilters = Object.keys(queryFilters).map((key: string) =>
        {
            const filter: Record<string, any> = query.filter as Record<string, any>;

            return {
                [key]: filter[key]
            };
        }).filter((value =>
        {
            const key = Object.keys(value)[0];
            return keys.includes(key) ? value : false;
        }));

        newFilters.forEach((newFilter: any) =>
        {
            const defaultKey: string = Object.keys(newFilter)[0];
            const defaultValue: string = newFilter[defaultKey];

            this.filters.set(defaultKey, defaultValue);
        });
    }

    get(key: string): string
    {
        return this.filters.has(key) ? this.filters.get(key) : '';
    }

    getArray(): any
    {
        return this.filters.entries();
    }

    has(key: string): boolean
    {
        return this.filters.has(key);
    }

    isEmpty(): boolean
    {
        return this.filters.size === 0;
    }

    values(): Map<string, any>
    {
        return this.filters;
    }

    abstract getFields(): string[];
    abstract getDefaultFilters(): any[];
}

export default Filter;
