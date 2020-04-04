import ISort from "../Contracts/ISort";
import * as express from "express";

abstract class Sort implements ISort
{
    /**
     * ['name' => 'asc'].
     */
    private sorts: any[];

    constructor(request: express.Request)
    {
        // this.sorts = array_only($data, $this->sortingKey);
    }

    get(sortFields: any[]): any[]
    {
        // Validate keys

        // $selected = [];
        // foreach ($this->sorts as $sortKey => $direction) {
        // $fields = $sortFields[$sortKey];
        //
        // if (is_string($fields)) {
        //     $selected[$fields] = $direction;
        //     continue;
        // }
        //
        // if (is_array($fields)) {
        //     $selected = array_merge($selected, array_combine($fields, array_fill(0, count($fields), $direction)));
        //     continue;
        // }
        //
        // if (is_callable($fields)) {
        //     $selected = array_merge($selected, $fields($direction));
        //     continue;
        // }
        //
        // throw new \LogicException('Invalid sort field declaration.');
    // }

        // return $selected;
        return [];
    }

    set(sortFields: any[]): void
    {
        // $this->sorts = array_only($sortFields, $this->sortingKey);
    }

    getRaw(): any[]
    {
        return this.sorts;
    }
}

export default Sort;