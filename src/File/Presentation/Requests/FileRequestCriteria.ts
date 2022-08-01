import { ParsedQs } from 'qs';
import FileFilter from '../Criterias/FileFilter';
import FileSort from '../Criterias/FileSort';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';

import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';

class FileRequestCriteria extends RequestCriteria implements ICriteria
{
    constructor(query: ParsedQs, url: string)
    {
        super(new FileSort(query), new FileFilter(query), new Pagination(query, url));
    }
}

export default FileRequestCriteria;
