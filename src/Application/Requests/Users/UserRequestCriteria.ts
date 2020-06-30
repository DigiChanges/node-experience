import * as express from "express";
import ICriteria from "../../../Lib/Contracts/ICriteria";
import IPagination from "../../../Lib/Contracts/IPagination";
import IFilter from "../../../Lib/Contracts/IFilter";
import ISort from "../../../Lib/Contracts/ISort";
import UserSort from "../../Criterias/User/UserSort";
import UserFilter from "../../Criterias/User/UserFilter";
import Pagination from "../../../Lib/Concrets/Pagination";

class UserRequestCriteria implements ICriteria
{
    private readonly sort: ISort;
    private readonly filter: IFilter;
    private readonly pagination: IPagination;

    constructor(request: express.Request)
    {
        this.pagination = new Pagination(request);
        this.sort = new UserSort(request);
        this.filter = new UserFilter(request);
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

export default UserRequestCriteria