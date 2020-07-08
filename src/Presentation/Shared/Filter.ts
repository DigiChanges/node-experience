import IFilter from "../../InterfaceAdapters/Shared/IFilter";
import * as express from "express";

abstract class Filter implements IFilter
{
    private filters: Map<string, string>;

    constructor(request: express.Request)
    {
        this.filters = new Map<string, string>();
        let queryFilters = request.query.hasOwnProperty('filter') ? request.query.filter : [];
        let defaultFilters = this.getDefaultFilters();
        let keys = this.getFields();

        defaultFilters.forEach((defaultFilter: any) => {
            const defaultKey: string = Object.keys(defaultFilter)[0];
            const defaultValue: string = defaultFilter[defaultKey];

            this.filters.set(defaultKey, defaultValue);
        });

        let newFilters = Object.keys(queryFilters).map((key: string) =>
        {
            const filter: any = request.query.filter;

            return {
                [key]: filter[key]
            };
        }).filter((value => {
            const key = Object.keys(value)[0];
            return keys.includes(key) ? value : false;
        }));

        newFilters.forEach((newFilter: any) => {
            const defaultKey: string = Object.keys(newFilter)[0];
            const defaultValue: string = newFilter[defaultKey];

            this.filters.set(defaultKey, defaultValue);
        });
    }

    get(key: string): string | boolean
    {
        return this.filters.has(key) ? this.filters.get(key) : false;
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

    values(): Map<string, string>
    {
        return this.filters;
    }

    abstract getFields(): any[];
    abstract getDefaultFilters(): any;
}

export default Filter;