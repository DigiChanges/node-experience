import { IPaginator } from '../../Main/Domain/Criteria/IPaginator';

interface ResponsePayload<T>
{
    data: T | T[];
    metadata?: Record<string, string>;
    pagination?: IPaginator
}

export default ResponsePayload;
