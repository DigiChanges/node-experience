import * as express from "express";
import ICriteria from "../../../../InterfaceAdapters/Shared/ICriteria";
import IPagination from "../../../../InterfaceAdapters/Shared/IPagination";
import IFilter from "../../../../InterfaceAdapters/Shared/IFilter";
import ISort from "../../../../InterfaceAdapters/Shared/ISort";
import ItemFilter from "../../../Criterias/Item/ItemFilter";
import ItemSort from "../../../Criterias/Item/ItemSort";
import Pagination from "../../../Shared/Pagination";

class ItemRequestCriteria implements ICriteria
{
    private readonly sort: ISort;
    private readonly filter: IFilter;
    private readonly pagination: IPagination;

    constructor(request: express.Request)
    {
        this.pagination = new Pagination(request);
        this.sort = new ItemSort(request);
        this.filter = new ItemFilter(request);
    }

    getPagination(): IPagination
    {
        return this.pagination;
    }

    getFilter(): IFilter
    {
        return this.filter;
    }

    getSort(): ISort
    {
        return this.sort;
    }
}

export default ItemRequestCriteria