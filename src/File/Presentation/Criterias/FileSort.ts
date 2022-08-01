import Sort from '../../../Shared/Presentation/Requests/Sort';

class FileSort extends Sort
{
    static readonly NAME: string = 'name';

    getFields(): any
    {
        return [
            FileSort.NAME
        ];
    }

    getDefaultSorts(): any
    {
        return [
            { [FileSort.NAME]: 'asc' }
        ];
    }
}

export default FileSort;
