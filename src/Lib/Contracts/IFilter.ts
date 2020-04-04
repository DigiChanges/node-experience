
interface IFilter {
    values(): any[];
    get(key: string, _default: string): any[];
    getRaw(key: string, _default: string): any[];
    getArray(key: string): any[];
    has(key: string): boolean;
    isNotEmpty(key:string): boolean;
    getFields(): any[];
}

export default IFilter