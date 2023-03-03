import { ParsedQs } from 'qs';

interface CriteriaPayload
{
    url: string;
    query: ParsedQs;
}

export default CriteriaPayload;
