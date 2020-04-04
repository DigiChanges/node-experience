
interface ISort {
    get(sortFields: any[]): any[];
    set(sortFields: any[]): void;
    getRaw(): any[];
}

export default ISort