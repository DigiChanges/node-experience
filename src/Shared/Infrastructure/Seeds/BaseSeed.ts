import ISeed from './ISeed';

abstract class BaseSeed implements ISeed
{
    abstract init(): Promise<void>;
}

export default BaseSeed;
