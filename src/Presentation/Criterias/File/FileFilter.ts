import Filter from "../../Shared/Filter";

class FileFilter extends Filter
{
    static readonly NAME: string = 'name';
    static readonly TYPE: string = 'type';

    getFields(): any
    {
        return [
            FileFilter.NAME,
            FileFilter.TYPE
        ];
    }

    getDefaultFilters(): any
    {
        return [];
    }
}

export default FileFilter;