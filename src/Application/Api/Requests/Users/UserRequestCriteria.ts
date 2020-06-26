import * as express from "express";
import ICriteria from "../../../../Lib/Contracts/ICriteria";
import IPagination from "../../../../Lib/Contracts/IPagination";
import IFilter from "../../../../Lib/Contracts/IFilter";
import ISort from "../../../../Lib/Contracts/ISort";
import UserSort from "../../Libs/Criterias/User/UserSort";
import UserFilter from "../../Libs/Criterias/User/UserFilter";
import Pagination from "../../../../Lib/Concrets/Pagination";

class UserRequestCriteria implements ICriteria
{
    private sort: ISort;
    private filter: IFilter;
    private pagination: IPagination;

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