import Sort from "../../Shared/Sort";

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
            {[FileSort.NAME]: 'asc'}
        ];
    }
}

export default FileSort;