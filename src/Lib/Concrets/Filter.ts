import IFilter from "../Contracts/IFilter";
import * as express from "express";

abstract class Filter implements IFilter
{
    private _values: any[];

    constructor(request: express.Request)
    {
        // $keys = collect($this->filters)->values()->all();
        // $this->values = Arr::only($data, $keys);
    }

    get(key: string, _default: string = null): any[]
    {
        // $value = Arr::get($this->values, key, _default);
        //
        // return $this->isEmpty($value) ? null : $value;
        return [];
    }

    getRaw(key: string, _default: string = null): any[]
    {
        // return Arr::get($this->values, $key, $default);
        return [];
    }

    /**
     * Returns an empty array as default.
     */
    getArray(key: string): any[]
    {
        // $value = $this->getRaw($key);
        //
        // return $this->isEmpty($value) ? [] : $value;
        return [];
    }

    has(key: string): boolean
    {
        // return Arr::has($this->values, $key);
        return true;
    }

     isNotEmpty(key: string): boolean
    {
        // return ! $this->isEmpty($this->getRaw($key));
        return true;
    }

    values(): any
    {
        // return $this->values;
    }

    isEmpty(value: any): boolean {
        // return $value === null || $value === false || $value === '' || $value === [];
        return true;
    }

    abstract getFields(): any[];
}

export default Filter;