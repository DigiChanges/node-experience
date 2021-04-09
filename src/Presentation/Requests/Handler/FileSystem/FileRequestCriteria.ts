import * as express from 'express';
import FileFilter from '../../../Criterias/File/FileFilter';
import FileSort from '../../../Criterias/File/FileSort';
import Pagination from '../../../Shared/Pagination';
import { ICriteria } from '@digichanges/shared-experience';

import RequestCriteria from "../Defaults/RequestCriteria";

class FileRequestCriteria extends RequestCriteria implements ICriteria
{
  constructor(request: express.Request)
    {
				super(new FileSort(request), new FileFilter(request), new Pagination(request))
    }
}

export default FileRequestCriteria;