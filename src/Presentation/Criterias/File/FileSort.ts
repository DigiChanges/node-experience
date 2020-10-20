import Sort from "../../Shared/Sort";

class FileSort extends Sort
{
    static readonly NAME: string = 'name';
    static readonly TYPE: string = 'type';

    getFields(): any
    {
        return [
            FileSort.NAME,
            FileSort.TYPE
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