import * as express from "express";
import {ICriteria, IFilter, IPagination, ISort} from "@digichanges/shared-experience";

import UserSort from "../../../Criterias/User/UserSort";
import UserFilter from "../../../Criterias/User/UserFilter";
import Pagination from "../../../Shared/Pagination";

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

export default UserRequestCriteria;
