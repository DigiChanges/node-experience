import * as express from "express";
import ICriteria from "../../../../InterfaceAdapters/Shared/ICriteria";
import IPagination from "../../../../InterfaceAdapters/Shared/IPagination";
import IFilter from "../../../../InterfaceAdapters/Shared/IFilter";
import ISort from "../../../../InterfaceAdapters/Shared/ISort";
import RoleSort from "../../../Criterias/Role/RoleSort";
import RoleFilter from "../../../Criterias/Role/RoleFilter";
import Pagination from "../../../Shared/Pagination";

class RoleRequestCriteria implements ICriteria
{
    private readonly sort: ISort;
    private readonly filter: IFilter;
    private readonly pagination: IPagination;

    constructor(request: express.Request)
    {
        this.pagination = new Pagination(request);
        this.sort = new RoleSort(request);
        this.filter = new RoleFilter(request);
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

export default RoleRequestCriteria