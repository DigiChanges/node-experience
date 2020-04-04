import Filter from "../../../../Lib/Concrets/Filter";


class ItemFilter extends Filter
{
    public static get SEARCH(): string { return 'search'};

    public static get filters(): any[] { return [
        this.SEARCH,
        ];
    }

    getFields(): any[]
    {
        return [
            'title',
        ];
    }
}

export default ItemFilter;