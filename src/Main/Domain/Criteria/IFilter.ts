
export interface IFilter
{
    values(): Map<string, unknown>;
    get(key: string): unknown;
    getArray(key: string): unknown[];
    has(key: string): boolean;
    isEmpty(): boolean;
    getFields(): unknown[];
}
