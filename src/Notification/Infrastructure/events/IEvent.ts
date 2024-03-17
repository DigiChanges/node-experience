export interface IEvent
{
    name: string;
    handle(props: any): Promise<void>;
}
