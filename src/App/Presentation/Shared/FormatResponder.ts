import { injectable } from 'inversify';
import IFormatResponder from '../../../Shared/InterfaceAdapters/IFormatResponder';

@injectable()
class FormatResponder implements IFormatResponder
{
    getFormatData = (data: unknown, metadata: Record<string, any> = null): any =>
    {
        return {
            data,
            metadata: metadata ?? undefined
        };
    };
}

export default FormatResponder;
