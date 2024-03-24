import { Sort } from '../../../Main/Domain/Criteria';

class FileSort extends Sort
{
    static readonly NAME: string = 'name';

    getFields(): string[]
    {
        return [
            FileSort.NAME
        ];
    }

    getDefaultSorts(): Record<string, 'asc' | 'desc'>[]
    {
        return [
            { [FileSort.NAME]: 'asc' }
        ];
    }
}

export default FileSort;
