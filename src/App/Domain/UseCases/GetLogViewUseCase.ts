import * as path from 'path';
import fs from 'fs';

class GetLogViewUseCase
{
    handle(): any
    {
        const view_route = path.join(__dirname, '../../../logs');
        const raw_data = fs.readFileSync(`${view_route}/error.log`, { encoding: 'utf-8' });

        // split the contents by new line
        const lines = raw_data.split(/\r?\n/);

        const data: any[] = [];

        lines.forEach((line) =>
        {
            if (line.includes('{"code":500'))
            {
                const error = JSON.parse(line);
                data.unshift(error);
            }
        });

        return data;
    }
}

export default GetLogViewUseCase;
