import {JsonContent} from "inversify-express-utils";

interface Transformer
{
    transform(data: any): any;
}

export default Transformer;