import * as express from "express";
import FileFilter from "../../../Criterias/File/FileFilter";
import FileSort from "../../../Criterias/File/FileSort";
import Pagination from "../../../Shared/Pagination";
import {IFilter, IPagination, ISort, ICriteria} from "@digichanges/shared-experience";

class FileRequestCriteria implements ICriteria
{
    private readonly sort: ISort;
    private readonly filter: IFilter;
    private readonly pagination: IPagination;

    constructor(request: express.Request)
    {
        this.pagination = new Pagination(request);
        this.sort = new FileSort(request);
        this.filter = new FileFilter(request);
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

export default FileRequestCriteria;