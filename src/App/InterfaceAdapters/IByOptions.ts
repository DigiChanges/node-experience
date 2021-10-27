import { PopulateOptions } from 'mongoose';

interface IByOptions
{
    initThrow? : boolean | undefined;
    populate?: string | string[] | PopulateOptions | PopulateOptions[] | undefined;
}

export default IByOptions;