import Sort from "../../../../Lib/Concrets/Sort";

class ItemSort extends Sort
{
    public static get TITLE(): string { return 'title'};

    public static get filters(): any[] { return [
            this.TITLE,
        ];
    }
}

export default ItemSort;