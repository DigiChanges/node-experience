import ISort from "../Contracts/ISort";
import * as express from "express";

abstract class Sort implements ISort
{
    private sorts: Map<string, string>;

    constructor(request: express.Request) {
        // TODO: Remove logic from constructor
        this.sorts = new Map<string, string>();
        let sorts = request.query.hasOwnProperty('sort') ? request.query.sort : [];
        let keys = this.getSorts();

        let defaultSorts = this.getDefaultSorts();

        defaultSorts.forEach((defaultSort: any) => {
            const defaultKey: string = Object.keys(defaultSort)[0];
            const defaultValue: string = defaultSort[defaultKey];

            this.sorts.set(defaultKey, defaultValue);
        });

        let newSorts = Object.keys(sorts).map((key: string) =>
        {
            return {
                [key]: request.query.sort[key]
            };
        }).filter((value => {
            const key = Object.keys(value)[0];
            return keys.includes(key) ? value : false;
        }));

        newSorts.forEach((newSort: any) => {
            const defaultKey: string = Object.keys(newSort)[0];
            const defaultValue: string = newSort[defaultKey];

            this.sorts.set(defaultKey, defaultValue);
        });
    }

    public get(): Map<string, string>
    {
        return this.sorts;
    }

    abstract getSorts(): any;
    abstract getDefaultSorts(): any;

}

export default Sort;