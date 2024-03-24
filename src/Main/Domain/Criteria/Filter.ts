import { ParsedQs } from 'qs';
import { IFilter } from './IFilter';

export abstract class Filter implements IFilter
{
    private readonly filters: Map<string, any>;

    constructor(query: ParsedQs)
    {
        this.filters = new Map<string, unknown>();
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
            const filter: Record<string, unknown> = query.filter as Record<string, unknown>;

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

    get<T>(key: string): T
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

    values(): Map<string, unknown>
    {
        return this.filters;
    }

    abstract getFields(): string[];
    abstract getDefaultFilters(): unknown[];
}
