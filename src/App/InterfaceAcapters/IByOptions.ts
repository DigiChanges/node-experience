import {PopulateOptions} from 'mongoose';

interface IByOptions
{
    initThrow? : boolean;
    populate?: string | PopulateOptions | PopulateOptions[];
}

export default IByOptions;