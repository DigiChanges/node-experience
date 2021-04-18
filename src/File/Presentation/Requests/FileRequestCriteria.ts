import * as express from 'express';
import FileFilter from '../Criterias/FileFilter';
import FileSort from '../Criterias/FileSort';
import Pagination from '../../../App/Presentation/Shared/Pagination';
import {ICriteria} from '@digichanges/shared-experience';

import RequestCriteria from '../../../App/Presentation/Requests/RequestCriteria';

class FileRequestCriteria extends RequestCriteria implements ICriteria
{
    constructor(request: express.Request)
    {
        super(new FileSort(request), new FileFilter(request), new Pagination(request));
    }
}

export default FileRequestCriteria;