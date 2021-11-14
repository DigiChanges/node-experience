import { ParsedQs } from 'qs';
import FileFilter from '../Criterias/FileFilter';
import FileSort from '../Criterias/FileSort';
import Pagination from '../../../App/Presentation/Shared/Pagination';
import { ICriteria } from '@digichanges/shared-experience';

import RequestCriteria from '../../../App/Presentation/Requests/RequestCriteria';

class FileRequestCriteria extends RequestCriteria implements ICriteria
{
    constructor(query: ParsedQs, url: string)
    {
        super(new FileSort(query), new FileFilter(query), new Pagination(query, url));
    }
}

export default FileRequestCriteria;
