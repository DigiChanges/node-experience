import { ParsedQs } from 'qs';
import { ISort } from './ISort';

export abstract class Sort implements ISort
{
    private readonly sorts: Map<string, string>;

    constructor(query: ParsedQs)
    {
        this.sorts = new Map<string, string>();
        const sorts: any = query.sort ?? [];
        const keys = this.getFields();

        const newSorts = Object.keys(sorts).map((key: string) =>
        {
            const sort: any = query.sort;

            return {
                [key]: sort[key]
            };
        }).filter((value =>
        {
            const key = Object.keys(value)[0];
            return keys.includes(key) ? value : false;
        }));

        newSorts.forEach((newSort: any) =>
        {
            const defaultKey: string = Object.keys(newSort)[0];
            const defaultValue: string = newSort[defaultKey];

            this.sorts.set(defaultKey, defaultValue);
        });

        const defaultSorts = this.getDefaultSorts();

        if (this.sorts.size === 0)
        {
            defaultSorts.forEach((defaultSort: any) =>
            {
                const defaultKey: string = Object.keys(defaultSort)[0];
                const defaultValue: string = defaultSort[defaultKey];

                this.sorts.set(defaultKey, defaultValue);
            });
        }
    }

    public get(): Map<string, string>
    {
        return this.sorts;
    }

    abstract getFields(): string[];
    abstract getDefaultSorts(): Record<string, 'asc' | 'desc'>[];
}
