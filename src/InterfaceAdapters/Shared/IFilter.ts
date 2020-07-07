
interface IFilter {
    values(): Map<string, string>;
    get(key: string): string | boolean;
    getArray(key: string): any[];
    has(key: string): boolean;
    isEmpty(): boolean;
    getFields(): any[];
}

export default IFilter